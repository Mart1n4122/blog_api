import express from "express";
import * as Post from "../data/post.js";
import db from "../data/db.js";

const router = express.Router();

// GET összes post
router.get("/", (req, res) => {
  const posts = db.prepare("SELECT * FROM posts").all();
  res.json(posts);
});

// GET egy post id alapján
router.get("/:id", (req, res) => {
  const post = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// POST új post
router.post("/", (req, res) => {
  const { userId, title, content } = req.body;
  if (!userId || !title || !content)
    return res.status(400).json({ error: "Missing fields" });
  const info = db
    .prepare("INSERT INTO posts (userId, title, content) VALUES (?, ?, ?)")
    .run(userId, title, content);
  const post = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(info.lastInsertRowid);
  res.status(201).json(post);
});

// PUT post módosítása
router.put("/:id", (req, res) => {
  const { title, content } = req.body;
  const info = db
    .prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?")
    .run(title, content, req.params.id);
  if (info.changes === 0)
    return res.status(404).json({ error: "Post not found" });
  const post = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(req.params.id);
  res.json(post);
});

// DELETE post
router.delete("/:id", (req, res) => {
  const info = db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);
  if (info.changes === 0)
    return res.status(404).json({ error: "Post not found" });
  res.json({ success: true });
});

export default router;
