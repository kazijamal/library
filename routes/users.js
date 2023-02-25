const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let token = {
    token: null,
  };
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    res.json(token);
  } else {
    bcrypt.compare(password, user.password, async function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result == true) {
        token.token =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        res.json(token);
      } else {
        res.json(token);
      }
    });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      console.log(err);
    }
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hash,
      },
    });
    res.json(user);
  });
});

module.exports = router;
