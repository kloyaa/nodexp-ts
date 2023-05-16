import bcrypt from "bcrypt";
import { httpMessage } from "../__core/constants";
import { TAuthLogin } from "../__core/interface";
import { generateJwt, getAwsSecrets } from "../__core/utils";
import { encrypt } from "../__core/utils/encrypt.util";
import { UserModel } from '../user/user.model';
import { emitter } from "../__core/events/emitter.event";
import { Activity, ActivityType } from "../__core/enum/activity.enum";

const login = async (data: TAuthLogin): Promise<any> => {
    try {
        const user = await UserModel.findOne({ username: data.username }).lean();
        if (!user) return httpMessage[10301].code;

        const secrets = await getAwsSecrets();
        if(!secrets) return httpMessage[10203].code;

        const [matched, generatedToken] = await Promise.all([
            bcrypt.compare(data.password, user.hashValue) as unknown as boolean,
            generateJwt({
                value: user._id,
                jwtExpiry: "1h",
                jwtSecret: secrets?.JWT_ACCESS_KEY!,
            })
        ]);

        if(!matched) {
            emitter.emit(Activity.LOGIN,  {
                userId: user._id,
                activity: ActivityType.LOGIN_FAILURE,
                device: data.device
            });
            return httpMessage[10301].code;
        }

        emitter.emit(Activity.LOGIN,  {
            userId: user._id,
            activity: ActivityType.LOGIN,
            device: data.device
        });

        const encryptedToken = encrypt(generatedToken, secrets?.JWT_ACCESS_KEY!);
        return `${encryptedToken.iv}.${encryptedToken.data}`;
    } catch (error) {
        throw error;
    }
}

const register = async (data: TAuthLogin) => {
    try {
        const user = await UserModel.findOne({ username: data.username });
        if (user) return httpMessage[10205].code;
    
        const secrets = await getAwsSecrets();
        if(!secrets) return httpMessage[10203].code;
    
        const hashValue = await bcrypt.hash(data.password, 12);
        const createdUser = await new UserModel({  ...data, hashValue  }).save();
    
        const generatedToken = await generateJwt({
            value: createdUser._id,
            jwtExpiry: "1h",
            jwtSecret: secrets?.JWT_ACCESS_KEY!,
        });
    
        emitter.emit(Activity.ACCOUNT_CREATION,  {
            userId: createdUser._id,
            activity: ActivityType.ACCOUNT_CREATION,
            device: data.device
        });

        const encryptedToken = encrypt(generatedToken, secrets?.JWT_ACCESS_KEY!);
        return `${encryptedToken.iv}.${encryptedToken.data}`;
    } catch (error) {
        throw error;
    }
}

export { 
    login as LoginService, 
    register as RegisterService
}