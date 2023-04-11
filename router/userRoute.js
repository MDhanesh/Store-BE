const express = require("express");
const router = express.Router();
const user = require("../models/userModel");

router.post("/register", user.register);

router.post("/login", user.login);

router.get("/getallusers", user.alluser);

router.post("/deleteuser", user.deleteuser);
module.exports = router;
