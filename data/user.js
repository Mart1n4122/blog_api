import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
    )`
).run();

const defaultUsers = [
  { name: "John Doe", email: "john@example.com", password: "password123" },
  { name: "Jane Smith", email: "jane@example.com", password: "securepass" },
  { name: "Alice Johnson", email: "alice@example.com", password: "alicepass" },
];

defaultUsers.forEach((user) => {
  db.prepare(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
  ).run(user.name, user.email, user.password);
});