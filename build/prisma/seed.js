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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.history.deleteMany();
        yield prisma.item.deleteMany();
        yield prisma.user.deleteMany();
        const regularUser = yield prisma.user.create({
            data: {
                userType: "regular",
                fullName: "John Doe",
                username: "username",
                password: "password",
            },
        });
        const adminUser = yield prisma.user.create({
            data: {
                userType: "admin",
                fullName: "Stephen Curry",
                username: "admin",
                password: "password",
            },
        });
        const item1 = yield prisma.item.create({
            data: {
                name: "Caliper",
                description: "Kynup Caliper Measuring Tool, Digital Micrometer Caliper Tool",
                image: "prisma/items/kynupCaliper.png",
                imagePublicId: null,
                status: "available",
                user_Id: null,
            },
        });
    });
}
main()
    .then(() => {
    console.log("db seeded");
})
    .catch((e) => {
    console.error(e);
    console.error("Something went wrong");
});
//# sourceMappingURL=seed.js.map