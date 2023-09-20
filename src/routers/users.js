"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.usersRouter = void 0;
var express_1 = require("express");
var zod_1 = require("zod");
var zod_express_middleware_1 = require("zod-express-middleware");
var prisma_1 = require("../prisma");
var helper_1 = require("../helper");
var auth_utils_1 = require("../auth-utils");
var usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.get("/", (0, zod_express_middleware_1.validateRequest)({
    query: zod_1.z
        .object({
        nameHas: zod_1.z.string(),
    })
        .strict()
        .partial(),
}), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nameHas, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nameHas = req.query.nameHas;
                return [4 /*yield*/, prisma_1.prisma.user.findMany({
                        where: {
                            fullName: {
                                contains: nameHas,
                            },
                        },
                    })];
            case 1:
                users = _a.sent();
                res.send(users);
                return [2 /*return*/];
        }
    });
}); });
// show endpoint Prisma
usersRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +req.params.id;
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        where: {
                            id: id,
                        },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send("No Content Boy!")];
                }
                res.send(user);
                return [2 /*return*/];
        }
    });
}); });
//show endpoint delete
usersRouter.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = helper_1.parseable.parse(req.params.id);
                return [4 /*yield*/, Promise.resolve()
                        .then(function () {
                        return prisma_1.prisma.user.delete({
                            where: {
                                id: id,
                            },
                        });
                    })
                        .catch(function () { return null; })];
            case 1:
                deleted = _a.sent();
                if (deleted === null) {
                    return [2 /*return*/, res.status(404).send({ error: "User not found" })];
                }
                return [2 /*return*/, res.status(200).send("Great Success!")];
        }
    });
}); });
usersRouter.post("/", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            errorMap: function (err) { return ({
                message: "name is required and must be a string",
            }); },
        }),
        userType: zod_1.z.string(),
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
}), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, newUser, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, auth_utils_1.encryptPassword)(req.body.password)];
            case 1:
                hashedPassword = _a.sent();
                return [4 /*yield*/, prisma_1.prisma.user.create({
                        data: __assign(__assign({}, req.body), { password: hashedPassword }),
                    })];
            case 2:
                newUser = _a.sent();
                res.status(201).send(newUser);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
usersRouter.patch("/:id", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string({
            errorMap: function (err) { return ({
                message: "fullName must be a string",
            }); },
        })
            .optional(),
        userType: zod_1.z.string().optional(),
        username: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
    }),
}), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, updateUser, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +req.params.id;
                body = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.prisma.user.update({
                        where: {
                            id: id,
                        },
                        data: body,
                    })];
            case 2:
                updateUser = _a.sent();
                res.status(201).send(updateUser);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                res.status(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
