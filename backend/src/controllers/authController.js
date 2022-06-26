const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const UserService = require("../services/user-service")
const LoginsService = require("../services/login-service")
const router = express.Router();

var user = new UserService()
var login = new LoginsService()

router.post("/cadastrar", async (req, res) => {
  return user.criarUser(req, res)
});

router.post("/login", async (req, res) => {
  return login.login(req, res)
});

module.exports = (app) => app.use("/auth", router);
