const express = require("express");
const {authMiddleware, authorize} = require("../middleware/authMiddleware");
const { createTask, getAllTasks, updateTask, deleteTask } = require("../controller/taskController");
const roles = require("../utils/roles");
const router = express.Router();

router.get("/", authMiddleware, authorize([roles["NORMAL"]]),getAllTasks);

router.post("/", authMiddleware, authorize([roles["NORMAL"]]), createTask);

router.put("/:taskId", authMiddleware, authorize([roles["NORMAL"]]), updateTask);

router.delete("/:taskId", authMiddleware, authorize([roles["NORMAL"]]), deleteTask);

module.exports = router;
