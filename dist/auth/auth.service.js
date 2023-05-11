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
exports.RegisterService = exports.LoginService = void 0;
require("dotenv").config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../__core/constants");
const utils_1 = require("../__core/utils");
const encrypt_util_1 = require("../__core/utils/encrypt.util");
const user_model_1 = require("../user/user.model");
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ username: data.username }).lean();
        if (!user)
            return constants_1.httpMessage[10301].code;
        const secrets = yield (0, utils_1.getAwsSecrets)({
            awsSecretId: process.env.AWS_SECRET_ID,
            awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
            awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
        if (!secrets)
            return constants_1.httpMessage[10203].code;
        const [compare, generatedToken] = yield Promise.all([
            bcrypt_1.default.compare(data.password, user.hashValue),
            (0, utils_1.generateJwt)({
                value: user._id,
                jwtExpiry: "1h",
                jwtSecret: secrets === null || secrets === void 0 ? void 0 : secrets.JWT_ACCESS_KEY,
            })
        ]);
        if (!compare)
            return constants_1.httpMessage[10301].code;
        const encryptedToken = (0, encrypt_util_1.encrypt)(generatedToken, secrets === null || secrets === void 0 ? void 0 : secrets.JWT_ACCESS_KEY);
        return `${encryptedToken.iv}.${encryptedToken.data}`;
    }
    catch (error) {
        console.log(error);
        return constants_1.httpMessage[10203].code;
    }
});
exports.LoginService = login;
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ username: data.username });
        if (user)
            return constants_1.httpMessage[10205].code;
        const secrets = yield (0, utils_1.getAwsSecrets)({
            awsSecretId: process.env.AWS_SECRET_ID,
            awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
            awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
        if (!secrets)
            return constants_1.httpMessage[10203].code;
        const hashValue = yield bcrypt_1.default.hash(data.password, 12);
        const createdUser = yield new user_model_1.UserModel(Object.assign(Object.assign({}, data), { hashValue })).save();
        const generatedToken = yield (0, utils_1.generateJwt)({
            value: createdUser._id,
            jwtExpiry: "1h",
            jwtSecret: secrets === null || secrets === void 0 ? void 0 : secrets.JWT_ACCESS_KEY,
        });
        const encryptedToken = (0, encrypt_util_1.encrypt)(generatedToken, secrets === null || secrets === void 0 ? void 0 : secrets.JWT_ACCESS_KEY);
        return `${encryptedToken.iv}.${encryptedToken.data}`;
    }
    catch (error) {
        utils_1.winstonLogger.error(error.stack);
        return constants_1.httpMessage[10203].code;
    }
});
exports.RegisterService = register;
//# sourceMappingURL=auth.service.js.map