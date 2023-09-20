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
exports.itemsRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const zod_express_middleware_1 = require("zod-express-middleware");
const prisma_1 = require("../prisma");
const auth_utils_1 = require("../auth-utils");
const helper_1 = require("../helper");
const itemsRouter = (0, express_1.Router)();
exports.itemsRouter = itemsRouter;
// items
itemsRouter.get("/", (0, zod_express_middleware_1.validateRequest)({
    query: zod_1.z
        .object({
        nameHas: zod_1.z.string(),
    })
        .strict()
        .partial(),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameHas = req.query.nameHas;
    const items = yield prisma_1.prisma.item.findMany({
        where: {
            name: {
                contains: nameHas,
            },
        },
    });
    res.send(items);
}));
// show endpoint Prisma
itemsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const item = yield prisma_1.prisma.item.findUnique({
        where: {
            id,
        },
    });
    if (!item) {
        return res.status(404).send("No Content Boy!");
    }
    res.send(item);
}));
//show endpoint delete
itemsRouter.delete("/:id", auth_utils_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.parseable.parse(req.params.id);
    const deleted = yield Promise.resolve()
        .then(() => prisma_1.prisma.item.delete({
        where: {
            id,
        },
    }))
        .catch((e) => {
        console.log(e);
    });
    if (deleted === null) {
        return res.status(404).send({ error: "Item not found" });
    }
    return res.status(200).send("Great Success!");
}));
itemsRouter.post("/", auth_utils_1.authMiddleware, (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        image: zod_1.z.string().optional(),
        imagePublicId: zod_1.z.string().optional(),
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        status: zod_1.z.string(),
        user_Id: zod_1.z.number().nullable(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    try {
        const newItem = yield prisma_1.prisma.item.create({
            data: Object.assign({}, req.body),
        });
        res.status(201).send(newItem);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
itemsRouter.patch("/:id", auth_utils_1.authMiddleware, (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        image: zod_1.z.string().optional(),
        imagePublicId: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        user_Id: zod_1.z.number().optional(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const body = req.body;
    try {
        const updateItem = yield prisma_1.prisma.item.update({
            where: {
                id,
            },
            data: body,
        });
        res.status(201).send(updateItem);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
//# sourceMappingURL=items.js.map