import express, { Request, Response } from "express";
import { Client } from "pg";

const app = express();

app.use(express.json());

const client = new Client("");

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "server is alive" });
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const query =
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)";

    const values = [username, email, password];

    console.log(query);

    const user = await client.query(query, values);

    res.status(200).json({
      message: "user created successfully",
      user,
    });
    return;
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Error Occured while signing in",
      error,
    });
    return;
  }
});

app.post("/createtodo", async (req: Request, res: Response) => {
  try {
    const { title, userId } = req.body;

    const query = "INSERT INTO todos (title,userId) VALUES ($1,$2)";

    const values = [title, userId];

    await client.query(query, values);

    res.json({
      message: "todo added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error in createtodo",
      error,
    });
    return;
  }
});

app.put("/updatetodo", async (req: Request, res: Response) => {
  try {
    const { todoId, newTitle } = req.body;

    const query = `UPDATE todos SET title = '${newTitle}' WHERE id = '${todoId}'`;
    console.log(query);

    await client.query(query);

    res.json({
      message: "todo updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "error in update todo" });
  }
});

app.delete("/deletetodo", async (req: Request, res: Response) => {
  try {
    const { todoId } = req.body;

    const query = `DELETE FROM todos WHERE id = ${todoId}`;

    await client.query(query);

    res.json({
      message: "todo deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "error in deletetodo",
    });
  }
});

//pending

app.get("/gettodo", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const query = `SELECT users.username ,users.email, 
    FROM users 
    FULL JOIN todos ON users.id = todos.userId WHERE user.id = $1`;

    await client.query(query, [userId]);
  } catch (error) {
    console.log(error);
    res.json({
      message: "error in gettodo",
      error,
    });
  }
});

const connectDB = async () => {
  await client.connect();
  console.log("db connection successful");

  //   const dat = await client.query(
  //     "insert into users (username, email, password) values ('imran', 'imran@sk.com','oimr123456')"
  //   );
  //   console.log(dat);

  // await client.query("update users set username = 'shahzad' where id=4");
  // const response = await client.query("select  * from users");
  // console.log(response);
};

connectDB()
  .then(
    () => app.listen(3000),
    () => {
      console.log("app is running on port 3000");
    }
  )
  .catch((error) => console.log(error));
