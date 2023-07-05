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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
const messaround_zod_1 = require("../messaround.zod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
//http://localhost:3000 + /
app.get("/", (req, res) => {
    res.send(`<h1>Hey</h1>`);
});
//index endpoint
app.get("/characters", (0, zod_express_middleware_1.validateRequest)({
    query: zod_1.z
        .object({
        nameHas: zod_1.z.string(),
    })
        .strict()
        .partial(),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameHas = req.query.nameHas;
    const characters = yield prisma.character.findMany({
        where: {
            name: {
                contains: nameHas,
            },
        },
    });
    res.send(characters);
}));
//show endpoint
// app.get("/characters/:id", (req, res) => {
//   res.send(characters.find((char) => char.id === +req.params.id));
// });
// show endpoint Prisma
app.get("/characters/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const character = yield prisma.character.findUnique({
        where: {
            id,
        },
    });
    if (!character) {
        return res.status(404).send("No Content Boy!");
    }
    res.send(character);
}));
//show endpoint delete
// app.delete("/characters/:id", (req, res) => {
//   const id = +req.params.id;
//   const originalCharactersLength = characters.length;
//   characters = characters.filter((char) => char.id !== id);
//   if (characters.length >= originalCharactersLength) {
//     return res.status(204).send();
//   }
//   return res.status(200).send("Great Success!");
// });
app.delete("/characters/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = +req.params.id;
    const id = messaround_zod_1.parseable.parse(req.params.id);
    const deleted = yield Promise.resolve()
        .then(() => prisma.character.delete({
        where: {
            id,
        },
    }))
        .catch(() => null);
    if (deleted === null) {
        return res.status(404).send({ error: "Character not found" });
    }
    return res.status(200).send("Great Success!");
}));
// app.post("/characters", (req, res) => {
//   characters.push(req.body);
//   res.status(201).send(req.body);
// });
app.post("/characters", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        name: zod_1.z.string({
            errorMap: (err) => ({
                message: "name is required and must be a string",
            }),
        }),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const body = req.body;
    // const name = body?.name;
    // if (typeof name !== "string") {
    //   return res.status(400).send({ error: "Name must be string" });
    // }
    try {
        const newCharacter = yield prisma.character.create({
            data: Object.assign({}, req.body),
        });
        res.status(201).send(newCharacter);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}));
// app.patch("/characters/:id", (req, res) => {
//   const id = +req.params.id;
//   characters = characters.map((char) =>
//     char.id === id ? { ...char, ...req.body } : char
//   );
//   res.status(201).send(characters.find((char) => char.id === id));
// });
app.patch("/characters/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const body = req.body;
    const name = body === null || body === void 0 ? void 0 : body.name;
    if (typeof name !== "string") {
        return res.status(400).send({ error: "Name must be string" });
    }
    try {
        const updateUser = yield prisma.character.update({
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
app.listen(3000);
//# sourceMappingURL=app.js.map