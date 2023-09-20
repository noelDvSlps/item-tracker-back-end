"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseable = void 0;
const zod_1 = require("zod");
exports.parseable = zod_1.z
    .string()
    .transform((n) => parseInt(n))
    .pipe(zod_1.z.number({ errorMap: (_err) => ({ message: "not parseable to a number" }) }));
//# sourceMappingURL=helper.js.map