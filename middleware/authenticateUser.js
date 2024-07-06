const jwt = require('jsonwebtoken');
const db = require('../config/connectDb');
const User = db.User;

const authenticateUser = async (req, res, next) => {
    let token;
    token = req?.headers?.authorization?.split('Bearer ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.id } });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'User is not Authenticated!!!' });
    }
};

module.exports = authenticateUser;
