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
  {
    userId: 1,
    title: "Martin első posztja",
    content: "Hogyan játszunk lolt 2025-ben",
  },
  {
    userId: 2,
    title: "Hajrá Fradi",
    content: "Megnyerte első idegenbeli meccsét a fradi",
  },
  {
    userId: 3,
    title: "Szétesett az ablak",
    content: "Leesett a harmadikról és széttört az ablak",
  },
];

defaultPosts.forEach((post) => {
  const exists = db
    .prepare(
      "SELECT 1 FROM posts WHERE userId = ? AND title = ? AND content = ?"
    )
    .get(post.userId, post.title, post.content);

  if (!exists) {
    db.prepare(
      "INSERT INTO posts (userId, title, content) VALUES (?, ?, ?)"
    ).run(post.userId, post.title, post.content);
  }
});
