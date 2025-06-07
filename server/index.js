const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./connection");
require("dotenv").config();

const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");

const app = express();
const PORT = process.env.PORT;

connectMongoDb(process.env.MONGO_URI)
  .then(() => console.log("MongoDb connected!"))
  .catch((err) => console.log(err));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server running successfully on PORT ${PORT}`);
});
