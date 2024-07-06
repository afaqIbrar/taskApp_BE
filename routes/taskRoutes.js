const express = require('express');
const router = express.Router();
const { registerTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controller/taskController')
const { validateRequest } = require('../middleware/validateRequest');
const { createTaskSchema, updateTaskSchema, deleteTaskSchema } = require('../validationSchemas/taskSchema');
const authenticateUser = require('../middleware/authenticateUser');


router.use(authenticateUser);
router.route('/').post(validateRequest(createTaskSchema), registerTask).get(getTasks)
router.route('/:id').get(getTaskById).put(validateRequest(updateTaskSchema), updateTask).delete(validateRequest(deleteTaskSchema), deleteTask);
module.exports = router;