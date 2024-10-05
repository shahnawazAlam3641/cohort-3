const express = require("express");
const app = express();

app.get("/multiply", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const result = a * b;
  res.send(`Result: ${result}`);
});

app.get("/add", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const result = a + b;
  res.send(result);
});

app.get("/divide", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  const result = a / b;
  res.send(result);
});

app.get("/subtract", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const result = a - b;
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
