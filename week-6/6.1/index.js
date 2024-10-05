const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const JWT_SECRET = "USER_APP";

app.use(express.json());

const users = [
  {
    username: "hello",
    password: "okay",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>mnknkExpress</h1>");
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });

  console.log(user);

  if (user) {
    const token = jwt.sign(user, JWT_SECRET);
    user.token = token;
    res.send({
      token,
    });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username,
    password,
  });

  res.send({ message: "you have signed up" });
});

app.get("/me", (req, res) => {
  const token = req.headers.token;

  const userDetails = jwt.verify(token, JWT_SECRET);

  const user = users.find((user) => {
    return user.username === userDetails.username;
  });

  if (user) {
    res.json(user);
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
});

app.listen(3000);
