const prisma = require("../db/prisma");
const { verifyAccessToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    const userId = await verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        role: true, // Include the role details
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });
    if (!user || !user.role || user.role.role !== "ADMIN") {
      return res.status(403).json({ error: "Only Admin Can Access" });
    }

    next();
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

const isUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });
    if (!user || !user.role || user.role.role !== "NORMAL") {
      return res.status(403).json({ error: "Only Users Can Access" });
    }

    next();
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};



const authorize = (allowedRoles) => (req, res, next) => {
  try {
    const userRole = req?.user?.role?.role;
    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient permissions" });
    }

    next();
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

module.exports = {
  authMiddleware,
  authorize,
  isUser,
  isAdmin
};
