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
exports.usersRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const zod_express_middleware_1 = require("zod-express-middleware");
const prisma_1 = require("../prisma");
const helper_1 = require("../helper");
const auth_utils_1 = require("../auth-utils");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.get("/", (0, zod_express_middleware_1.validateRequest)({
    query: zod_1.z
        .object({
        nameHas: zod_1.z.string(),
    })
        .strict()
        .partial(),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameHas = req.query.nameHas;
    const users = yield prisma_1.prisma.user.findMany({
        where: {
            fullName: {
                contains: nameHas,
            },
        },
    });
    res.send(users);
}));
// show endpoint Prisma
usersRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        return res.status(404).send("No Content Boy!");
    }
    res.send(user);
}));
//show endpoint delete
usersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.parseable.parse(req.params.id);
    const deleted = yield Promise.resolve()
        .then(() => prisma_1.prisma.user.delete({
        where: {
            id,
        },
    }))
        .catch(() => null);
    if (deleted === null) {
        return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send("Great Success!");
}));
usersRouter.post("/", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            errorMap: (err) => ({
                message: "name is required and must be a string",
            }),
        }),
        userType: zod_1.z.string(),
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield (0, auth_utils_1.encryptPassword)(req.body.password);
        const newUser = yield prisma_1.prisma.user.create({
            data: Object.assign(Object.assign({}, req.body), { password: hashedPassword }),
        });
        res.status(201).send(newUser);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
usersRouter.patch("/:id", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string({
            errorMap: (err) => ({
                message: "fullName must be a string",
            }),
        })
            .optional(),
        userType: zod_1.z.string().optional(),
        username: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const body = req.body;
    try {
        const updateUser = yield prisma_1.prisma.user.update({
            where: {
                id,
            },
            data: body,
        });
        res.status(201).send(updateUser);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
//# sourceMappingURL=users.js.map