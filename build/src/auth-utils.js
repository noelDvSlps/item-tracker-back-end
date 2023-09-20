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
exports.authMiddleware = exports.getDataFromAuthToken = exports.createTokenForUser = exports.createUnsecuredUserInformation = exports.encryptPassword = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const saltRounds = 11;
const encryptPassword = (password) => {
    return bcrypt_1.default.hash(password, saltRounds);
};
exports.encryptPassword = encryptPassword;
const createUnsecuredUserInformation = (user) => ({
    username: user.username,
    userType: user.userType,
    fullName: user.fullName,
});
exports.createUnsecuredUserInformation = createUnsecuredUserInformation;
const createTokenForUser = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
    //   jwt.sign(data, process.env.SIGNATURE_KEY as string, {
    //     expiresIn: '30d',
    //     algorithm: "HS256"
    // }, (err, encoded)=>{
    //     err ? reject(err) : resolve(encoded)
    // })
};
exports.createTokenForUser = createTokenForUser;
const jwtInfoSchema = zod_1.z.object({
    username: zod_1.z.string(),
    iat: zod_1.z.number(),
});
const getDataFromAuthToken = (token) => {
    if (!token)
        return null;
    try {
        return jwtInfoSchema.parse(jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET));
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
exports.getDataFromAuthToken = getDataFromAuthToken;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const [, token] = ((_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split) === null || _b === void 0 ? void 0 : _b.call(_a, " ")) || [];
    const myJwtData = (0, exports.getDataFromAuthToken)(token);
    if (!myJwtData) {
        return res.status(401).json({ message: "invalid Token" });
    }
    const userFromJwt = yield prisma.user.findFirst({
        where: {
            username: myJwtData.username,
        },
    });
    if (!userFromJwt) {
        return res.status(401).json({ message: "user not found" });
    }
    // req.user = userFromJwt;
    next();
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth-utils.js.map