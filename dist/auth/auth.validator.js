"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidators = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidators = [
    (0, express_validator_1.body)('username').notEmpty().isString().trim().escape(),
    (0, express_validator_1.body)('password').notEmpty().isString().trim().escape(),
    (0, express_validator_1.body)('device').notEmpty().isObject(),
];
//# sourceMappingURL=auth.validator.js.map