const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  login,
  // updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

/* Creating the routes for the user controller. */
router.get("/users", getUsers);

router.get("/users/:name", getUser);

router.post("/users", createUser);

router.post("/login",login);

// router.patch("/users/:name", updateUser);

router.delete("/users/:name", deleteUser);

module.exports = router;