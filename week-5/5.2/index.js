const express = require("express");

const app = express();

app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  console.log(a);
  res.json({
    ans: a + b,
  });
});

app.listen(3000);
