import { User } from "@prisma/client";
import express from "express";
import cors from "cors";
import { usersRouter } from "./routers/users";
import { itemsRouter } from "./routers/items";
import { itemsHistoryRouter } from "./routers/itemsHistory";
import { loginRouter } from "./routers/login";

const app = express();
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

["DATABASE_URL", "JWT_SECRET"].forEach((key) => {
  if (process.env[key] === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }
});

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send(`<h1>Item Tracker</h1>`);
});

app.use("/login", loginRouter);

app.use("/users", usersRouter);

app.use("/items", itemsRouter);

app.use("/itemsHistory", itemsHistoryRouter);

app.listen(3000);
