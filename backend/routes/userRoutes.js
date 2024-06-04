const express = require("express");

const {
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
} = require("../controller/userController");
const { authMiddleware, isAdmin, isUser, authorize} = require("../middleware/authMiddleware");
const roles = require("../utils/roles");

const router = express.Router();

router.post("/sign-up", signUp);

router.post("/login", login);

router.post("/logout", logout);

router.get("/chart-for-user", authMiddleware,  authorize([roles["NORMAL"]]), chartForUser);
router.get("/updates", authMiddleware, authorize([roles["NORMAL"]]), getUpdates);

router.get("/:id", authMiddleware, authorize([roles["NORMAL"]]), getProfileDetails);

router.get("/", authMiddleware, authorize([roles["ADMIN"]]), getAllUsers); //admin

router.get("/chart-for-admin", authMiddleware, authorize([roles["ADMIN"]]), chartForAdmin); //admin
router.get("/thumbnails", authMiddleware, authorize([roles["ADMIN"]]), getThumbnails); //admin
router.get("/images", authorize([roles["ADMIN"]]), getImages);

router.put("/", authMiddleware, authorize([roles["NORMAL"]]),  updateUserProfile);



router.delete("/", authMiddleware, authorize([roles["NORMAL"]]), deleteUserById);

module.exports = router;
