const prisma = require("../db/prisma");
const { generateAccessToken } = require("../utils/jwt");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: {
          connect: { id: 1 }, // Connect to Role with ID 1
        },
        email,
      },
    });

    const token = generateAccessToken(user?.id, email);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { token },
      include: {
        role: true, // Include the role details
      },
    });

    res.json({ token, role: updatedUser.role.role, username, avatar: user?.avatar });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true, // Include the role details
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = generateAccessToken(user?.id, email);

    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    res.json({ token, role: user?.role?.role, username: user?.username, avatar: user?.avatar });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

const logout = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { token: null },
    });

    res.json({ message: "success" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

const getProfileDetails = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      select: {
        username: true,
        avatar: true,
        phone: true,
        age: true,
        email: true,
        introPdf: true,
        gender: true,
        usage: true,
        role: {
          select: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    res.json({ data: user });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    res.json({ deletedUser });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: req.body.dataToUpdate,
    });

    res.json(updatedUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

const getImages = async (req, res) => {
  try {
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};
const chartForUser = async (req, res) => {
  try {
    const completedTasksCount = await prisma.task.count({
      where: {
        isCompleted: true,
      },
    });

    const pendingTasksCount = await prisma.task.count({
      where: {
        isCompleted: false,
      },
    });

    res.json({
      data: [
        { category: "Completed Tasks", value: completedTasksCount },
        { category: "Incomplete Tasks", value: pendingTasksCount },
      ],
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};
const getUpdates = async (req, res) => {
  try {
    const updates = await prisma.UserUpdates.findMany();
    res.json({ data: updates });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

//admin routes
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ data: users });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};
const chartForAdmin = async (req, res) => {
  try {
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};
const getThumbnails = async (req, res) => {
  try {
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error");
  }
};

module.exports = {
  signUp,
  login,
  logout,
  getProfileDetails,
  getAllUsers,
  deleteUserById,
  updateUserProfile,
  chartForAdmin,
  getThumbnails,
  getImages,
  chartForUser,
  getUpdates,
};
