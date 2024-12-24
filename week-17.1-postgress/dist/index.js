"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = new pg_1.Client("postgresql://neondb_owner:9MmKlC2SURJj@ep-restless-math-a1i2svps.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");
app.get("/", (req, res) => {
    res.json({ message: "server is alive" });
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const query = "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)";
        const values = [username, email, password];
        console.log(query);
        const user = yield client.query(query, values);
        res.status(200).json({
            message: "user created successfully",
            user,
        });
        return;
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "Error Occured while signing in",
            error,
        });
        return;
    }
}));
app.post("/createtodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, userId } = req.body;
        const query = "INSERT INTO todos (title,userId) VALUES ($1,$2)";
        const values = [title, userId];
        yield client.query(query, values);
        res.json({
            message: "todo added successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "error in createtodo",
            error,
        });
        return;
    }
}));
app.put("/updatetodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId, newTitle } = req.body;
        const query = `UPDATE todos SET title = '${newTitle}' WHERE id = '${todoId}'`;
        console.log(query);
        yield client.query(query);
        res.json({
            message: "todo updated successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "error in update todo" });
    }
}));
app.delete("/deletetodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.body;
        const query = `DELETE FROM todos WHERE id = ${todoId}`;
        yield client.query(query);
        res.json({
            message: "todo deleted",
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            error,
            message: "error in deletetodo",
        });
    }
}));
app.get("/gettodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const query = `SELECT users.username ,users.email, 
    FROM users 
    FULL JOIN todos ON users.id = todos.userId WHERE user.id = $1`;
        yield client.query(query, [userId]);
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "error in gettodo",
            error,
        });
    }
}));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log("db connection successful");
    //   const dat = await client.query(
    //     "insert into users (username, email, password) values ('imran', 'imran@sk.com','oimr123456')"
    //   );
    //   console.log(dat);
    // await client.query("update users set username = 'shahzad' where id=4");
    // const response = await client.query("select  * from users");
    // console.log(response);
});
connectDB()
    .then(() => app.listen(3000), () => {
    console.log("app is running on port 3000");
})
    .catch((error) => console.log(error));
