import express from "express";
import { LoginService, RegisterService } from "../services";
import { httpMessage } from "../__core/constants";
import { isAuthenticated } from "../middlewares";
const router = express.Router();

router.post("/auth/login", async (req, res) => {
    const login = await LoginService({
        username: req.body.username,
        password: req.body.password,
        device: req.body.device
    });

    if(login === '10301') return res
        .status(401)
        .json(httpMessage[10301]);

    return res.status(200).json({ accessToken: login });
});

router.post("/auth/register", async (req, res) => {
    const register = await RegisterService({
        username: req.body.username,
        password: req.body.password,
        device: req.body.device
    });

    if(register === '10205') return res
        .status(401)
        .json(httpMessage[10205]);

    return res.status(200).json({ accessToken: register });
});


module.exports = router;