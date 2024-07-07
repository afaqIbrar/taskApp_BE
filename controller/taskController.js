const db = require('../config/connectDb');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Task = db.Task;


// @desc Register Task
// @route POST /api/task
// @access Private
const registerTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const user = req.user;
    const checkTaskExist = await Task.findOne({ where: { title: title, userId: user.id } });
    if (checkTaskExist) {
        res.status(400)
        throw new Error('Task Already exists with this Title');
    }
    const task = await Task.create({
        title, userId: user.id, description
    })
    if (task) {
        res.status(200).json({
            id: task.id,
            title: task.title,
            status: task.status,
            description: task.description,
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// @desc Get All Task By User
// @route GET /api/task
// @access Private
const getTasks = asyncHandler(async (req, res) => {
    const user = req.user;
    const tasks = await Task.findAll({ where: { userId: user.id }, order: [['createdAt', 'DESC']] });

    res.status(200).json(tasks);
});


// @desc Get Task By ID
// @route GET /api/task/:id
// @access Private
const getTaskById = asyncHandler(async (req, res) => {
    const user = req.user;
    const task = await Task.findOne({ where: { id: req.params.id, userId: user.id } });

    if (!task) {
        res.status(404);
        throw new Error(`Task not found against the ID:${req.params.id}`);
    }
    res.status(200).json(task);
});

// @desc Update Task By ID
// @route PUT /api/task/:id
// @access Private
const updateTask = asyncHandler(async (req, res) => {
    const user = req.user;
    const task = await Task.findOne({ where: { id: req.params.id, userId: user.id } });

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }
    await Task.update(req.body, { where: { id: req.params.id, userId: user.id }, returning: true, });
    const updatedTask = await Task.findOne({ where: { id: req.params.id, userId: user.id } });
    res.status(200).json(updatedTask);
});

// @desc Delete Task By ID
// @route DELETE /api/task/:id
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
    const user = req.user;
    const task = await Task.findOne({ where: { id: req.params.id, userId: user.id } });

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    await task.destroy();

    res.status(200).json({ message: 'Task removed' });
});


module.exports = { registerTask, getTasks, getTaskById, updateTask, deleteTask }