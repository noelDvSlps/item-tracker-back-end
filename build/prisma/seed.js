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
{
    console.log("Planting seeds, please wait...🌱🌱🌱");
}
const client_1 = require("@prisma/client");
const auth_utils_1 = require("../src/auth-utils");
const prisma = new client_1.PrismaClient();
const jonDoe = {
    userType: "regular",
    fullName: "John Doe",
    username: "username",
    password: "password",
    id: 1,
};
const alexisHeart = {
    userType: "admin",
    fullName: "Alexis Heart",
    username: "alexis143",
    password: "alexis143",
    id: 2,
};
const kirkHammet = {
    userType: "regular",
    fullName: "Kirk Hammett",
    username: "hammetk",
    password: "hammetk",
    id: 3,
};
const stephenCurry = {
    userType: "admin",
    username: "admin",
    password: "password",
    fullName: "Stephen Curry",
    id: 4,
};
const db = {
    users: [jonDoe, alexisHeart, kirkHammet, stephenCurry],
    items: [
        {
            image: "items/kynupCaliper.png",
            name: "Caliper",
            description: "Kynup Caliper Measuring Tool, Digital Micrometer Caliper Tool",
            status: "available",
            id: 1,
            user_Id: null,
        },
        {
            image: "items/ballPeinHammer.png",
            name: "Hammer",
            description: "Ball Pein hammer Titan - 8 Oz. Ball Pein Hammer",
            status: "available",
            id: 2,
            user_Id: null,
        },
        {
            image: "items/mitutoyoMicrometer.png",
            name: "Micrometer",
            description: "Mitutoyo 293-348-30 Digimatic Micrometer",
            status: "available",
            id: 3,
            user_Id: null,
        },
        {
            image: "items/wiseUpWrench.png",
            name: "Wrench",
            description: "WISEUP Adjustable Wrench 8 Inch Professional Cr-V Forged",
            status: "available",
            user_Id: null,
            id: 4,
        },
        {
            image: "items/cobraPliers.png",
            name: "Plier",
            description: "Cobra Water Pump Pliers",
            status: "available",
            id: 5,
            user_Id: null,
        },
        {
            image: "items/workProRatchet.png",
            name: "Ratchet",
            description: "WORKPRO 3/8-Inch Drive Ratchet Wrench",
            status: "available",
            user_Id: null,
            id: 6,
        },
        {
            image: "items/craftsmanHammer.png",
            name: "hammer",
            description: "CRAFTSMAN Hammer, Fiberglass",
            status: "available",
            id: 7,
            user_Id: null,
        },
        {
            image: "items/crimpingTool.png",
            name: "crimper",
            description: "Plustool Crimping Tool for Heat Shrink Connectors AWG22-10",
            status: "available",
            id: 8,
            user_Id: null,
        },
        {
            image: "items/olympiaClamp.png",
            name: "C-Clamp",
            description: 'Olympia Tools C-Clamp (8" X 4") 38-148',
            status: "available",
            id: 9,
            user_Id: null,
        },
        {
            image: "items/wihaMagnetizer.png",
            name: "Magnetizer",
            description: "Wiha 40010 | Magnetizer Demagnetizer , Black",
            status: "available",
            user_Id: null,
            id: 10,
        },
        {
            image: "items/fruholtRatchet.png",
            name: "Ratchet",
            description: "Fruholt Multi-function 7mm-19mm Ratchet Universal",
            status: "available",
            id: 11,
            user_Id: null,
        },
        {
            image: "items/kleinScrewdriver.png",
            name: "Screwdriver",
            description: "Klein Tools 32308 Multi-bit Stubby Screwdriver",
            status: "available",
            user_Id: null,
            id: 12,
        },
        {
            image: "items/keryeHandSaw.png",
            name: "Hand Saw",
            description: "KERYE Mini Hand Saw Woodworking Tools, 6 Inch Japanese Pull Saw",
            status: "available",
            id: 13,
            user_Id: null,
        },
        {
            image: "items/irwinPliers.png",
            name: "Pliers",
            description: "IRWIN VISE-GRIP Convertible Snap Ring Pliers, 6-1/2-Inch",
            status: "available",
            id: 14,
            user_Id: null,
        },
        {
            image: "items/laoaPliers.png",
            name: "Pliers",
            description: "LAOA Needle-Nose Pliers Electrician Pliers",
            status: "available",
            id: 15,
            user_Id: null,
        },
        {
            image: "items/wihaVoltageTester.png",
            name: "Voltage Tester",
            description: "Wiha Non-Contact Voltage Tester",
            status: "available",
            user_Id: null,
            id: 16,
        },
        {
            image: "items/milwaukeeSander.png",
            name: "Sander",
            description: "Milwaukee 2531-20 12V Brushless Cordless Orbital Detail Sander",
            status: "available",
            id: 17,
            user_Id: null,
        },
        {
            image: "items/milwaukeeDrill.png",
            name: "Electric Drill",
            description: "Milwaukee M18 Li-Ion Cordless Compact Electric Drill Driver",
            status: "available",
            user_Id: null,
            id: 18,
        },
        {
            image: "items/xtremePowerSaw.png",
            name: "Electric Saw",
            description: "XtremepowerUS 47522 Worm Drive Circular Saw 7-1/4",
            status: "available",
            id: 19,
            user_Id: null,
        },
        {
            image: "items/laserVoltageTester.png",
            name: "Voltage Tester, Level",
            description: "Lasers & Levels Non-Contact AC Voltage Tester/Voltage Tester Pen",
            status: "available",
            id: 20,
            user_Id: null,
        },
        {
            image: "items/elvesCutter.png",
            name: "Cutter",
            description: "ELves Electrical Wire Cable Cutters",
            status: "available",
            id: 21,
            user_Id: null,
        },
        {
            image: "items/aicevoosMultimeter.png",
            name: "Multimeter",
            description: "Aicevoos AS-118D Smart Digital Multimeter Auto-Ranging Voltmeter",
            status: "available",
            user_Id: null,
            id: 22,
        },
        {
            image: "items/dewaltBeltSander.png",
            name: "Belt Sander",
            description: "DEWALT 20V MAX* Belt Sander, Cordless",
            status: "available",
            id: 23,
            user_Id: null,
        },
        {
            image: "items/electricCaulking.png",
            name: "Electric Caulking Gun",
            description: "Electric Caulking Gun Cordless",
            status: "available",
            user_Id: null,
            id: 24,
        },
        {
            image: "items/kawasakiDrill.png",
            name: "Drill",
            description: "Kawasaki 840176 Green 5.8 Amp 3/8-Inch Variable Speed Reversible Drill",
            status: "available",
            user_Id: null,
            id: 25,
        },
    ],
    itemsHistory: [],
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.history.deleteMany();
        yield prisma.item.deleteMany();
        yield prisma.user.deleteMany();
        db.users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.create({
                data: {
                    id: user.id,
                    userType: user.userType,
                    fullName: user.fullName,
                    username: user.username,
                    password: yield (0, auth_utils_1.encryptPassword)(user.password),
                },
            });
        }));
        // const regularUser = await prisma.user.create({
        //   data: {
        //     userType: "regular",
        //     fullName: "John Doe",
        //     username: "username",
        //     password: "password",
        //   },
        // });
        // const adminUser = await prisma.user.create({
        //   data: {
        //     userType: "admin",
        //     fullName: "Stephen Curry",
        //     username: "admin",
        //     password: "password",
        //   },
        // });
        db.items.forEach((item) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.item.create({
                data: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    image: item.image,
                    status: item.status,
                    user_Id: item.user_Id,
                },
            });
        }));
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