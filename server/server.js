const express = require("express");

const server = express();

const bodyParser = require("body-parser");
const sequelize = require("./db");
const Sequelize = require("sequelize");
const cors = require("cors");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");

server.set("trust proxy", 1);

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hanger-client.onrender.com",
      "https://hanger-navy.vercel.app/",
    ],
    credentials: true,
  })
);

const myStore = new SequelizeStore({ db: sequelize });

server.use(
  session({
    proxy: true,
    secret: "milpitascalifornia",
    store: myStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

const usersRoute = require("./routes/users");
const clothingItemsRoute = require("./routes/clothingItems");

server.use("/users", usersRoute);
server.use("/clothingItems", clothingItemsRoute);

server.get("/assets/logo", (req, res) => {
  res.sendFile(path.join(__dirname + "/assets/clocat.png"));
});

server.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "client/dist", "index.html"))
);

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
