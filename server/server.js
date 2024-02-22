const express = require("express");

const server = express();

const bodyParser = require("body-parser");
const sequelize = require("./db");
const Sequelize = require("sequelize");
const cors = require("cors");
const session = require("express-session");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

server.use(
  session({
    secret: "milpitascalifornia",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const usersRoute = require("./routes/users");
const clothingItemsRoute = require("./routes/clothingItems");

server.use("/users", usersRoute);
server.use("/clothingItems", clothingItemsRoute);

sequelize
  .sync()
  .then(() => {
    console.log("Connection successful.");
    server.listen(3000);
  })
  .catch((err) => {
    console.log("Unable to connect to database");
    console.log(err);
  });
