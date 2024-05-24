const prisma = require('../db/prisma');

const createTask = async (req, res) => {
    try {
        const task = await prisma.task.create({
            data: {
              owner: {
                connect: { id: req.user.id }, // Connect to Role with ID 1
              },
              ...req.body.taskData
            },
          });
        
        res.status(201).json({createdTask: task})
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Error");
      }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                ownerId: req.user.id
            }
        });
        res.json({data: tasks})
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Error");
      }
}
const updateTask = async (req, res) => {
    try {
        const updatedTask = await prisma.task.update({
            where: {
                ownerId: req.user.id,
                id: parseInt(req.params.taskId)
            },
            data: req.body.dataToUpdate,
          });
      
        res.json(updatedTask)
    }catch (e) {
        console.log(e.message);
        res.status(500).send("Error");
      }
}

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await prisma.task.delete({
            where: {
                ownerId: req.user.id,
                id: parseInt(req.params.taskId)
            },
          });
      
          res.json({deletedTask})
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Error");
      }
}

module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
}