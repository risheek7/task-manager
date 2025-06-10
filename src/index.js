const express = require('express');
require('./db/mongoose');

const app = express();

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");


const port = 3000;

// app.use((req, res, next) => {

//     res.status(503).send("Site is under maintenance");

// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//starting server
app.listen(port, () => {
    console.log("server is up and running on port:" + 3000);
})