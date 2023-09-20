"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var users_1 = require("./routers/users");
var items_1 = require("./routers/items");
var itemsHistory_1 = require("./routers/itemsHistory");
var login_1 = require("./routers/login");
var app = (0, express_1.default)();
["DATABASE_URL", "JWT_SECRET"].forEach(function (key) {
    if (process.env[key] === undefined) {
        throw new Error("Missing environment variable ".concat(key));
    }
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", function (_req, res) {
    res.send("<h1>Item Tracker</h1>");
});
app.use("/login", login_1.loginRouter);
app.use("/users", users_1.usersRouter);
app.use("/items", items_1.itemsRouter);
app.use("/itemsHistory", itemsHistory_1.itemsHistoryRouter);
app.listen(3000);
