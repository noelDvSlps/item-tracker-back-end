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
exports.itemsHistoryRouter = void 0;
var express_1 = require("express");
var zod_1 = require("zod");
var zod_express_middleware_1 = require("zod-express-middleware");
var prisma_1 = require("../prisma");
var helper_1 = require("../helper");
var auth_utils_1 = require("../auth-utils");
var itemsHistoryRouter = (0, express_1.Router)();
exports.itemsHistoryRouter = itemsHistoryRouter;
// History
itemsHistoryRouter.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var history;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.history.findMany()];
            case 1:
                history = _a.sent();
                res.send(history);
                return [2 /*return*/];
        }
    });
}); });
// show endpoint Prisma
itemsHistoryRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, history;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +req.params.id;
                return [4 /*yield*/, prisma_1.prisma.history.findUnique({
                        where: {
                            id: id,
                        },
                    })];
            case 1:
                history = _a.sent();
                if (!history) {
                    return [2 /*return*/, res.status(404).send("No Content Boy!")];
                }
                res.send(history);
                return [2 /*return*/];
        }
    });
}); });
//show endpoint delete
itemsHistoryRouter.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = helper_1.parseable.parse(req.params.id);
                return [4 /*yield*/, Promise.resolve()
                        .then(function () {
                        return prisma_1.prisma.history.delete({
                            where: {
                                id: id,
                            },
                        });
                    })
                        .catch(function () { return null; })];
            case 1:
                deleted = _a.sent();
                if (deleted === null) {
                    return [2 /*return*/, res.status(404).send({ error: "Item not found" })];
                }
                return [2 /*return*/, res.status(200).send("Great Success!")];
        }
    });
}); });
itemsHistoryRouter.post("/", auth_utils_1.authMiddleware, (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        user_Id: zod_1.z.number(),
        transaction: zod_1.z.string(),
        item_Id: zod_1.z.number(),
        timeStamp: zod_1.z.string(),
    }),
}), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newHistory, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.prisma.history.create({
                        data: __assign({}, req.body),
                    })];
            case 1:
                newHistory = _a.sent();
                res.status(201).send(newHistory);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
itemsHistoryRouter.patch("/:id", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        user_Id: zod_1.z.number().optional(),
        transaction: zod_1.z.string().optional(),
        item_Id: zod_1.z.number().optional(),
        timeStamp: zod_1.z.date().optional(),
    }),
}), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, updateHistory, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +req.params.id;
                body = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.prisma.history.update({
                        where: {
                            id: id,
                        },
                        data: body,
                    })];
            case 2:
                updateHistory = _a.sent();
                res.status(201).send(updateHistory);
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
