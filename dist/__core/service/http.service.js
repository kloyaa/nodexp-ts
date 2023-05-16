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
exports.handlePromiseError = exports.handlePromise = void 0;
require("dotenv").config();
const constants_1 = require("../constants");
/**
 * @description Wraps a promise in error handling and logging logic.
 * @param promise The promise to handle.
 * @returns The resolved value of the promise.
 * @throws The error thrown by the promise.
 */
function handlePromise(promise) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield promise;
        }
        catch (error) {
            return constants_1.httpMessage[10203].code;
        }
    });
}
exports.handlePromise = handlePromise;
/**
 * @description Wraps a promise in error handling and logging logic.
 * @param code typeof string
 * @returns string or boolean
 */
function handlePromiseError(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const httpMessages = constants_1.httpMessage;
        for (const key in httpMessages) {
            if (constants_1.httpMessage.hasOwnProperty(key) && key === code) {
                return httpMessages[key].code;
            }
        }
        return false;
    });
}
exports.handlePromiseError = handlePromiseError;
//# sourceMappingURL=http.service.js.map