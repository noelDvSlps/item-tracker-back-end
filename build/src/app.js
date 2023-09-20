"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = require("./routers/users");
const items_1 = require("./routers/items");
const itemsHistory_1 = require("./routers/itemsHistory");
const login_1 = require("./routers/login");
const app = (0, express_1.default)();
["DATABASE_URL", "JWT_SECRET"].forEach((key) => {
    if (process.env[key] === undefined) {
        throw new Error(`Missing environment variable ${key}`);
    }
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (_req, res) => {
    res.send(`<h1>Item Tracker</h1>`);
});
app.use("/login", login_1.loginRouter);
app.use("/users", users_1.usersRouter);
app.use("/items", items_1.itemsRouter);
app.use("/itemsHistory", itemsHistory_1.itemsHistoryRouter);
app.listen(3000);
//# sourceMappingURL=app.js.map