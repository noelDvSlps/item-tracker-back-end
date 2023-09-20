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
exports.loginRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const zod_express_middleware_1 = require("zod-express-middleware");
const prisma_1 = require("../prisma");
const auth_utils_1 = require("../auth-utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginRouter = (0, express_1.Router)();
exports.loginRouter = loginRouter;
loginRouter.post("/", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        username: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const username = req.body.username;
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    if (!user) {
        return res.status(404).send({ message: "Username not found" });
    }
    const isPasswordCorrect = user
        ? yield bcrypt_1.default.compare(password, user.password)
        : false;
    if (!isPasswordCorrect) {
        return res.status(401).send({ message: "Invalid Credentials" });
    }
    const userInformation = (0, auth_utils_1.createUnsecuredUserInformation)(user);
    const token = (0, auth_utils_1.createTokenForUser)(user);
    return res.status(200).json({ token, userInformation });
}));
//# sourceMappingURL=login.js.map