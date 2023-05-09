import express from "express";
const router = express.Router();
import { decrypt, encrypt } from "../services/encrypt.service";

router.post("/encrypt", (req, res) => {
    return res.status(200).json(encrypt(req.body.value, "fk02p0$fpxd@"));
});

router.post("/decrypt", (req, res) => {
    return res.status(200).json({ decrypted: decrypt(req.body, "fk02p0$fpxd@") });
});

module.exports = router;