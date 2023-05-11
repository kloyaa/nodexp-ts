"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const encrypt_util_1 = require("../__core/utils/encrypt.util");
router.post("/encrypt", (req, res) => {
    return res.status(200).json((0, encrypt_util_1.encrypt)(req.body.value, "fk02p0$fpxd@"));
});
router.post("/decrypt", (req, res) => {
    return res.status(200).json({ decrypted: (0, encrypt_util_1.decrypt)(req.body, "fk02p0$fpxd@") });
});
exports.default = router;
//# sourceMappingURL=security.controller.js.map