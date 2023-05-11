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
exports.handlePromise = void 0;
const constants_1 = require("../constants");
const utils_1 = require("../utils");
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
            utils_1.winstonLogger.error(error);
            return constants_1.httpMessage[10203].code;
        }
    });
}
exports.handlePromise = handlePromise;
//# sourceMappingURL=http.service.js.map