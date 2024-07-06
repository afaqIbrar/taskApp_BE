const { object, string } = require('yup');

const createTaskSchema = object({
    body: object({
        title: string().required("Title is Required!!!"),
        description: string().required("Description is Required!!!"),
    })
});
const updateTaskSchema = object({
    body: object({
        title: string().optional(),
        status: string().optional(),
        description: string().optional(),
    }),
    params: object({
        id: string().required().matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/).label('UUID'),
    })
});
const deleteTaskSchema = object({
    params: object({
        id: string().required().matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/).label('UUID'),
    })
});

module.exports = { createTaskSchema, updateTaskSchema, deleteTaskSchema };