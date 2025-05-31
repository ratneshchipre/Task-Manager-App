const express = require("express");

const { connectMongoDb } = require("./connection");

const taskRouter = require("./routes/task");

const app = express();
const PORT = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/task-manager-app").then(() =>
  console.log("MongoDb connected!")
);

app.use(express.urlencoded({ extended: false }));

app.use("/", taskRouter);

app.listen(PORT, () => {
  console.log(`Server running successfully on PORT ${PORT}`);
});
