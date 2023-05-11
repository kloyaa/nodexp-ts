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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const utils_1 = require("./__core/utils");
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
const security_controller_1 = __importDefault(require("./security/security.controller"));
const app = (0, express_1.default)();
function runApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const secrets = yield (0, utils_1.getAwsSecrets)();
        let port = Number(process.env.PORT);
        let connectionString = process.env.CONNECTION_STRING;
        if (process.env.NODE_ENV === "production") {
            port = secrets === null || secrets === void 0 ? void 0 : secrets.PORT;
            connectionString = secrets === null || secrets === void 0 ? void 0 : secrets.DB_CONNECTION_STRING;
        }
        mongoose_1.default
            .set("strictQuery", false)
            .set("strictPopulate", false)
            .connect(connectionString)
            .then(() => console.log("DATABASE CONNECTED"))
            .catch(() => console.log("DABASE DISCONNECTED"));
        /**
         * @description Middlewares
         */
        app.use((0, cors_1.default)({ origin: "*" }));
        app.use(express_useragent_1.default.express());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ limit: '25mb', extended: true }));
        /**
         * @description Routes
         */
        app.get('/', (req, res) => res.send('Express Typescript on Vercel'));
        app.use("/api/v1", auth_controller_1.default);
        app.use("/api/v1", security_controller_1.default);
        app.listen(port, () => {
            console.log(`RUNNING ON ${process.env.NODE_ENV}`);
            console.log(`RUNNING ON ${port}`);
        });
    });
}
runApp();
//# sourceMappingURL=index.js.map