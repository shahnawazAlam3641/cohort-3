#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");

// File path to store todos
const todosFilePath = path.join(__dirname, "todos.json");

// Function to read todos from the file
function readTodos() {
  if (!fs.existsSync(todosFilePath)) {
    return [];
  }
  const todosData = fs.readFileSync(todosFilePath, "utf8");
  return JSON.parse(todosData);
}

// Function to write todos to the file
function writeTodos(todos) {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
}

// Add a new todo
program
  .command("add <todo>")
  .description("Add a new todo")
  .action((todo) => {
    const todos = readTodos();
    todos.push({ todo, done: false });
    writeTodos(todos);
    console.log(`Added todo: ${todo}`);
  });

// Delete a todo
program
  .command("delete <index>")
  .description("Delete a todo by index")
  .action((index) => {
    const todos = readTodos();
    if (index >= 0 && index < todos.length) {
      const removed = todos.splice(index, 1);
      writeTodos(todos);
      console.log(`Deleted todo: ${removed[0].todo}`);
    } else {
      console.log("Invalid index");
    }
  });

// Mark a todo as done
program
  .command("done <index>")
  .description("Mark a todo as done by index")
  .action((index) => {
    const todos = readTodos();
    if (index >= 0 && index < todos.length) {
      todos[index].done = true;
      writeTodos(todos);
      console.log(`Marked todo as done: ${todos[index].todo}`);
    } else {
      console.log("Invalid index");
    }
  });

// List all todos
program
  .command("list")
  .description("List all todos")
  .action(() => {
    const todos = readTodos();
    todos.forEach((todo, index) => {
      console.log(`${index}. ${todo.todo} [${todo.done ? "x" : " "}]`);
    });
  });

program.parse(process.argv);
