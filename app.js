import express from "express";
import cors from "cors";
import postsRoutes from "./routers/postsRoutes.js";
import usersRoutes from "./routers/usersRoutes.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Servers runs on http://localhost:${PORT}`);
});
