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
const express_validator_1 = require("express-validator");
const constants_1 = require("../__core/constants");
const is_valid_request_body_utils_1 = require("../__core/middlewares/is-valid-request-body.utils");
const auth_service_1 = require("./auth.service");
const auth_validator_1 = require("./auth.validator");
const index_1 = require("../__core/service/index");
const router = express_1.default.Router();
router.post("/auth/login", (0, is_valid_request_body_utils_1.expressMiddlewares)(auth_validator_1.loginValidators), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, device } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res
            .status(400)
            .json({ errors: errors.array() });
    const login = yield (0, index_1.HandlePromise)((0, auth_service_1.LoginService)({ username, password, device }));
    if (login === '10301')
        return res
            .status(401)
            .json(constants_1.httpMessage[10301]);
    return res.status(200).json({ accessToken: login });
}));
router.post("/auth/register", (0, is_valid_request_body_utils_1.expressMiddlewares)(auth_validator_1.loginValidators), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, device } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res
            .status(400)
            .json({ errors: errors.array() });
    const register = yield (0, index_1.HandlePromise)((0, auth_service_1.RegisterService)({ username, password, device }));
    if (register === '10205')
        return res
            .status(401)
            .json(constants_1.httpMessage[10205]);
    return res.status(200).json({ accessToken: register });
}));
exports.default = router;
//# sourceMappingURL=auth.controller.js.map