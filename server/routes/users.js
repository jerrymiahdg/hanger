const express = require("express");

const router = express.Router();

const controller = require("../controllers/users");

router.get("/getUsers", controller.getGetUsers);

router.get("/isLoggedIn", controller.getIsLoggedIn);

router.post("/createUser", controller.postCreateUser);

router.post("/logIn", controller.postLogIn);

router.post("/logOut", controller.postLogOut);

module.exports = router;
