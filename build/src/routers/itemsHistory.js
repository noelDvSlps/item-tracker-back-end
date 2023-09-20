"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsHistoryRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const zod_express_middleware_1 = require("zod-express-middleware");
const prisma_1 = require("../prisma");
const helper_1 = require("../helper");
const auth_utils_1 = require("../auth-utils");
const itemsHistoryRouter = (0, express_1.Router)();
exports.itemsHistoryRouter = itemsHistoryRouter;
// History
itemsHistoryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const history = yield prisma_1.prisma.history.findMany();
    res.send(history);
}));
// show endpoint Prisma
itemsHistoryRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const history = yield prisma_1.prisma.history.findUnique({
        where: {
            id,
        },
    });
    if (!history) {
        return res.status(404).send("No Content Boy!");
    }
    res.send(history);
}));
//show endpoint delete
itemsHistoryRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = +req.params.id;
    const id = helper_1.parseable.parse(req.params.id);
    const deleted = yield Promise.resolve()
        .then(() => prisma_1.prisma.history.delete({
        where: {
            id,
        },
    }))
        .catch(() => null);
    if (deleted === null) {
        return res.status(404).send({ error: "Item not found" });
    }
    return res.status(200).send("Great Success!");
}));
itemsHistoryRouter.post("/", auth_utils_1.authMiddleware, (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        user_Id: zod_1.z.number(),
        transaction: zod_1.z.string(),
        item_Id: zod_1.z.number(),
        timeStamp: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newHistory = yield prisma_1.prisma.history.create({
            data: Object.assign({}, req.body),
        });
        res.status(201).send(newHistory);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
itemsHistoryRouter.patch("/:id", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        user_Id: zod_1.z.number().optional(),
        transaction: zod_1.z.string().optional(),
        item_Id: zod_1.z.number().optional(),
        timeStamp: zod_1.z.date().optional(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const body = req.body;
    try {
        const updateHistory = yield prisma_1.prisma.history.update({
            where: {
                id,
            },
            data: body,
        });
        res.status(201).send(updateHistory);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
//# sourceMappingURL=itemsHistory.js.map