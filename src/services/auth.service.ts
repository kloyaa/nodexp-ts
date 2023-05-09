require("dotenv").config();
import bcrypt from "bcrypt";
import { httpMessage } from "../__core/constants";
import { TAuthLogin } from "../__core/interface";
import { generateJwt, getAwsSecrets } from "../__core/utils";
import { UserSchema } from "../models";
import { encrypt } from "./encrypt.service";

export const login = async (data: TAuthLogin) => {
    try {        
        const user = await UserSchema.findOne({ username: data.username }).lean();
        if (!user) return httpMessage[10301].code;

        const secrets = await getAwsSecrets({
            awsSecretId: process.env.AWS_SECRET_ID!,
            awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        });
        if(!secrets) return httpMessage[10203].code;

        const [compare, generatedToken] = await Promise.all([
            bcrypt.compare(data.password, user.hashValue) as unknown as boolean,
            generateJwt({
                value: user._id,
                jwtExpiry: "1h",
                jwtSecret: secrets?.JWT_ACCESS_KEY!,
            })
        ]);

        if(!compare) return httpMessage[10301].code;

        const encryptedToken = encrypt(generatedToken, secrets?.JWT_ACCESS_KEY!);
        return `${encryptedToken.iv}.${encryptedToken.data}`;
    } catch (error) {
        console.log(error);
        return httpMessage[10203].code;
    }
}

export const register = async (data: TAuthLogin) => {
    try {
        const user = await UserSchema.findOne({ username: data.username });
        if (user) return httpMessage[10205].code;

        const secrets = await getAwsSecrets({
            awsSecretId: process.env.AWS_SECRET_ID!,
            awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        });

        if(!secrets) return httpMessage[10203].code;

        const hashValue = await bcrypt.hash(data.password, 12);
        const createdUser = await new UserSchema({  ...data, hashValue  }).save();

        const generatedToken = await generateJwt({
            value: createdUser._id,
            jwtExpiry: "1h",
            jwtSecret: secrets?.JWT_ACCESS_KEY!,
        });

        const encryptedToken = encrypt(generatedToken, secrets?.JWT_ACCESS_KEY!);
        return `${encryptedToken.iv}.${encryptedToken.data}`;
    } catch (error) {
        console.log(error);
        return httpMessage[10203].code;
    }
}