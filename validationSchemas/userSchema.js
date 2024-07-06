const { object, string } = require('yup');

const createUserSchema = object({
    body: object({
        password: string()
            .required('password is required')
            .min(5, 'Password is too short - Should be min 5 characters').required(),
        userName: string().required('User Name is required!!!'),
    })
});

const loginUserSchema = object({
    body: object({
        password: string()
            .required('password is required'),
        userName: string().required('User Name is required!!!'),
    })
})
module.exports = { createUserSchema, loginUserSchema };