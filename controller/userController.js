const db = require('../config/connectDb');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = db.User;
const { generateToken } = require('../services/authService');

// @desc Register User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    // Check if user exist
    const checkUserExist = await User.findOne({ where: { userName: userName } });
    if (checkUserExist) {
        res.status(400)
        throw new Error('This User Name already exist in the system!!!');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        userName, password: hashedPassword
    })
    if (user) {
        res.status(200).json({
            id: user.id,
            userName: user.userName,
            token: generateToken(user)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


//@desc Auth user//set token
//route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
    const user = await User.findOne({ where: { userName: userName } });
    if (!user) {
        res.status(400);
        throw new Error('No User Exist with this User Name');
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (user && matchPassword) {
        const token = generateToken(user);
        res.status(200).json({
            id: user.id,
            userName: user.userName,
            token
        })
    } else {
        res.status(400);
        throw new Error('Invalid Email or password');
    }
})




module.exports = { registerUser, authUser }