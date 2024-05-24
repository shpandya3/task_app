const jwt = require("jsonwebtoken");

function generateAccessToken(id, username) {
  const payload = {
    id,
    username,
  };

  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "7d" };

  return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🚀 ~ verifyAccessToken ~ decoded:", decoded)
        return decoded?.id
    } catch(e) {
        console.log(e.message)
        return "error"
    }
  }

module.exports = {
  generateAccessToken,
  verifyAccessToken
};
