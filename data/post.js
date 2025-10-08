import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS posts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
    )`
).run();

const defaultPosts = [
  { userId: 1, title: "First Post", content: "This is the first post content." },
  { userId: 2, title: "Second Post", content: "This is the second post content." },
  { userId: 3, title: "Third Post", content: "This is the third post content." },
];

defaultPosts.forEach((post) => {
  db.prepare(
    "INSERT INTO posts (userId, title, content) VALUES (?, ?, ?)"
  ).run(post.userId, post.title, post.content);
});
