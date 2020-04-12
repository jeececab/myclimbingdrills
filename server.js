const express = require('express');
require('dotenv').config();
require('./db/mongoose');

const userRouter = require('./routers/user_router');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => console.log('Server is up on port ' + port));
