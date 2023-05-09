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
const express_1 = __importDefault(require("express"));
const services_1 = require("../services");
const constants_1 = require("../__core/constants");
const router = express_1.default.Router();
router.post("/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = yield (0, services_1.LoginService)({
        username: req.body.username,
        password: req.body.password,
        device: req.body.device
    });
    if (login === '10301')
        return res
            .status(401)
            .json(constants_1.httpMessage[10301]);
    return res.status(200).json({ accessToken: login });
}));
router.post("/auth/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const register = yield (0, services_1.RegisterService)({
        username: req.body.username,
        password: req.body.password,
        device: req.body.device
    });
    if (register === '10205')
        return res
            .status(401)
            .json(constants_1.httpMessage[10205]);
    return res.status(200).json({ accessToken: register });
}));
module.exports = router;
//# sourceMappingURL=auth.controller.js.map