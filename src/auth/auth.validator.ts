import { body } from "express-validator";

export const loginValidators = [
    body('username').notEmpty().isString().trim().escape(),
    body('password').notEmpty().isString().trim().escape(),
    body('device').notEmpty().isObject()
];