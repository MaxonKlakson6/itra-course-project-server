const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const sequelize = require("./database/db");
const router = require("./routes/index");
const models = require("./models");
const likesAndCommentsHandler = require("./sockets/likesAndCommentsHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

const server = http.createServer(app);
const webSocketServer = new Server(server, {
  cors: {
    origin: "*",
  },
});

const startSocketServer = (socket) => {
  likesAndCommentsHandler(socket, webSocketServer);
};

const startApplication = async () => {
  try {
    const PORT = process.env.PORT || 4000;
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApplication();
webSocketServer.on("connection", startSocketServer);
