const express = require("express");

const app = express();

let todos = [];

app.get("/api", (req, res) => {
  res.json(todos);
});

// route to add a new todo
app.get("/add/:todo", (req, res) => {
  const newTodo = req.params.todo;
  todos.push(newTodo);

  res.send(`Added new todo: ${newTodo}`);
});

// route to delete a todo
app.get("/delete/:index", (req, res) => {
  const todoToDelete = Number(req.params.index) - 1;

  if (todos[todoToDelete]) {
    todos.splice(todoToDelete, 1);

    res.send("Deleted todo");
  } else {
    res.send("Invalid Index");
  }
});

// route to clear all todos
app.get("/clear", (req, res) => {
  todos = [];
  res.send("Cleared all todos");
});

// route to render todos
app.get("/", (req, res) => {
  let todoList = todos
    .map((todo, index) => {
      return `<li>${index + 1}. ${todo}</li>`;
    })
    .join("");
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Todo List</title>
      <style>
        body { padding: 20px; }
        ul { list-style-type: none; padding: 0; }
        li { padding: 10px; background: #f0f0f0; margin-bottom: 5px; }
      </style>
    </head>
    <body>
      <h1>Todo List</h1>
      <ul> ${todoList}</ul>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
