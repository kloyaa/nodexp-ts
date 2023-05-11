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
exports.expressMiddlewares = void 0;
const express_validator_1 = require("express-validator");
/**
 * @description sequential processing, stops running validations chain if the previous one fails.
 * @param validations array of validation chains
 * @returns next() if no errors, else returns 400 with errors
 */
const expressMiddlewares = (validations) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        for (let validation of validations) {
            const result = yield validation.run(req);
            if (result.errors.length)
                break;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty())
            return next();
        res.status(400).json({ errors: errors.array() });
    });
};
exports.expressMiddlewares = expressMiddlewares;
//# sourceMappingURL=is-valid-request-body.utils.js.map