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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.getDataFromAuthToken = exports.createTokenForUser = exports.createUnsecuredUserInformation = exports.encryptPassword = void 0;
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var zod_1 = require("zod");
var prisma = new client_1.PrismaClient();
var saltRounds = 11;
var encryptPassword = function (password) {
    return bcrypt_1.default.hash(password, saltRounds);
};
exports.encryptPassword = encryptPassword;
var createUnsecuredUserInformation = function (user) { return ({
    username: user.username,
    userType: user.userType,
    fullName: user.fullName,
}); };
exports.createUnsecuredUserInformation = createUnsecuredUserInformation;
var createTokenForUser = function (user) {
    return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
    //   jwt.sign(data, process.env.SIGNATURE_KEY as string, {
    //     expiresIn: '30d',
    //     algorithm: "HS256"
    // }, (err, encoded)=>{
    //     err ? reject(err) : resolve(encoded)
    // })
};
exports.createTokenForUser = createTokenForUser;
var jwtInfoSchema = zod_1.z.object({
    username: zod_1.z.string(),
    iat: zod_1.z.number(),
});
var getDataFromAuthToken = function (token) {
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
var authMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, myJwtData, userFromJwt;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = ((_c = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split) === null || _c === void 0 ? void 0 : _c.call(_b, " ")) || [], token = _a[1];
                myJwtData = (0, exports.getDataFromAuthToken)(token);
                if (!myJwtData) {
                    return [2 /*return*/, res.status(401).json({ message: "invalid Token" })];
                }
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            username: myJwtData.username,
                        },
                    })];
            case 1:
                userFromJwt = _d.sent();
                if (!userFromJwt) {
                    return [2 /*return*/, res.status(401).json({ message: "user not found" })];
                }
                // req.user = userFromJwt;
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.authMiddleware = authMiddleware;
