"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseable = void 0;
var zod_1 = require("zod");
exports.parseable = zod_1.z
    .string()
    .transform(function (n) { return parseInt(n); })
    .pipe(zod_1.z.number({ errorMap: function (_err) { return ({ message: "not parseable to a number" }); } }));
