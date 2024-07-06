const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT;
const { errorHandler, notFound } = require('./middleware/errorMiddleWare');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');


const db = require('./config/connectDb');

const app = express();

app.use(cors({
    origin: process.env.APP_PATH,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)
app.get('/', (req, res) => {
    res.send('Server is Running!!!');
})
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})