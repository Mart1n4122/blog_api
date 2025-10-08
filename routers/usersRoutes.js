import { Router } from "express";
import db from "../data/db.js";

const router = Router();

router.get("/", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing fields" });
  const info = db
    .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
    .run(name, email, password);
  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(info.lastInsertRowid);
  res.status(201).json(user);
});

router.put("/:id", (req, res) => {
  const { name, email, password } = req.body;
  const info = db
    .prepare("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?")
    .run(name, email, password, req.params.id);
  if (info.changes === 0)
    return res.status(404).json({ error: "User not found" });
  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.params.id);
  res.json(user);
});

router.delete("/:id", (req, res) => {
  const info = db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
  if (info.changes === 0)
    return res.status(404).json({ error: "User not found" });
  res.json({ success: true });
});

export default router;
