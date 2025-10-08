import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
    )`
).run();

const defaultUsers = [
  {
    name: "Tóthmihály Martin",
    email: "b1totmar@vasvari.org",
    password: "jelszomvan123",
  },
  {
    name: "Ferencváros hivatalos",
    email: "ferencvarosgol@gmail.com",
    password: "securepass",
  },
  {
    name: "Szeged365",
    email: "szeged365@gmail.hu",
    password: "hajraszegediek",
  },
];

defaultUsers.forEach((user) => {
  const exists = db
    .prepare("SELECT 1 FROM users WHERE email = ?")
    .get(user.email);

  if (!exists) {
    db.prepare(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    ).run(user.name, user.email, user.password);
  }
});
