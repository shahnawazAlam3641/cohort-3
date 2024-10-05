const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = "iLoveJWT";

const users = [
  {
    fullName: "hello kitty",
    username: "user3",
    password: "gooh khale",
    todos: [],
  },
];

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedToken = jwt.verify(token, JWT_SECRET);

  const foundUser = users.find((user) => {
    return user.username === decodedToken;
  });

  if (foundUser) {
    req.user = foundUser;
    next();
  } else {
    res.json({ message: "token not found please sign in first" });
  }
}

app.post("/signup", (req, res) => {
  const { fullName, username, password } = req.body;
  console.log(fullName, username, password);

  const userExists = users.some((user) => {
    return user.username === username;
  });

  if (userExists) {
    res.json({
      signupSuccessfull: false,
      message: "Username not available",
    });
  } else {
    users.push({ fullName, username, password, todos: [] });

    res.json({
      signupSuccessfull: true,
      fullName: fullName,
      username: username,
      password: password,
      todos: [],
    });
  }

  // console.log(users);
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);

  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (user) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    // localStorage.setItem(token);

    res.json({
      signinSuccessfull: true,
      username: username,
      password: password,
      token: token,
    });
  } else {
    res.json({ signinSuccessfull: false });
  }
});

app.post("/addtodo", (req, res) => {
  const username = req.body.username;
  const todo = req.body.todo;
  let index;

  users.map((user, ind) => {
    if (user.username === username) {
      console.log(users);
      index = ind;
    }
  });
  users[index].todos.push(todo);
  res.json(users[index]);
});

// app.get("/", auth, (req, res) => {
//   res.json({ message: "okk" });
// });

app.listen(3000);
