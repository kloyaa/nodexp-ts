import express, { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { httpMessage } from "../__core/constants";
import { expressMiddlewares } from '../__core/middlewares/is-valid-request-body.utils';
import { LoginService, RegisterService } from "./auth.service";
import { loginValidators } from "./auth.validator";
import { TAuthLogin } from '../__core/interface/auth.interface';
import { HandlePromise, HandlePromiseError } from "../__core/service/index";
import "../__core/events/emitter.event"
import { emitter } from "../__core/events/emitter.event";


const router = express.Router();

router.post("/auth/login", 
    expressMiddlewares(loginValidators), 
    async (req: Request, res: Response) => {
    const { username, password, device }: TAuthLogin = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    emitter.emit('activity', "USER_LOGIN", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res
        .status(400)
        .json({ errors: errors.array() });
    
    const login = await HandlePromise<any>(LoginService({ 
        username, 
        password, 
        device: { ...device,  ipAddress } 
    }));

    const hasError = await HandlePromiseError<String | Boolean>(login);
    if(hasError && typeof hasError === 'string') {
        return res
            .status(400)
            .json(httpMessage[hasError]);
    }

    return res.status(200).json({ accessToken: login });
});

router.post("/auth/register",
    expressMiddlewares(loginValidators),  
    async (req: Request, res: Response) => {

    const { username, password, device }: TAuthLogin = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res
        .status(400)
        .json({ errors: errors.array() });

    const register = await HandlePromise<string>(RegisterService({ username, password, device }));
    if(register === '10205') return res
        .status(401)
        .json(httpMessage[10205]);

    return res.status(200).json({ accessToken: register });
});

export default router;