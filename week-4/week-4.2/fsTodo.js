const express = require("express");
const fs = require("fs");

const app = express();

const readTodoFile = () => {
  try {
    const data = fs.readFileSync("todo.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file or parsing JSON:", err);
  }
};

const writeTodoFile = (todos) => {
  try {
    fs.writeFileSync("todo.json", JSON.stringify(todos));
  } catch (err) {
    console.error("Error writing to file:", err);
  }
};

app.get("/api", (req, res) => {
  const todos = readTodoFile();
  res.json(todos);
});

app.get("/add/:todo", (req, res) => {
  const newTodo = req.params.todo;

  const todos = readTodoFile();
  todos.push(newTodo);

  writeTodoFile(todos);
  res.send(`Added new todo: ${newTodo}`);
});

app.get("/delete/:index", (req, res) => {
  const todoToDelete = Number(req.params.index) - 1;

  const todos = readTodoFile();

  if (todos[todoToDelete]) {
    todos.splice(todoToDelete, 1);
    writeTodoFile(todos);
    res.send("Deleted todo");
  } else {
    res.send("Invalid Index");
  }
});

app.get("/clear", (req, res) => {
  writeTodoFile([]);
  res.send("Cleared all todos");
});

app.get("/", (req, res) => {
  const todos = readTodoFile();

  const todoList = todos
    .map((todo, index) => `<li>${index + 1}. ${todo}</li>`)
    .join("");

  const html = `
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
      <ul>${todoList}</ul>

      <h2>To Render Todo ==> "/"</h2>
    <h2>To Add Todo ==> "/add/YOUR TODO"</h2>
    <h2>To Delete Todo ==> "/delete/Index of Todo"</h2>
    <h2>To clear Todos ==> "/clear>"</h2>
    <h2>To to inspect Todo JSON ==> "/api"</h2>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
