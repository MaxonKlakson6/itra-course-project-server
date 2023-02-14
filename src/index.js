const express = require("express");
require("dotenv").config();
const cors = require("cors");

const sequelize = require("./database/db");
const router = require("./routes/index");
const models = require("./models");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

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