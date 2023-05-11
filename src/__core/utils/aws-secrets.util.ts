require("dotenv").config();
import { SecretsManagerClient, GetSecretValueCommand, SecretsManagerClientConfig } from "@aws-sdk/client-secrets-manager";
import { AwsSecretsResult } from "../interface";

export const getAwsSecrets = async (): Promise<AwsSecretsResult | null> => {
    const clientConfig: SecretsManagerClientConfig = {
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    };
    const client = new SecretsManagerClient(clientConfig);
    const params = {
        SecretId: process.env.AWS_SECRET_ID,
        VersionStage: "AWSCURRENT",
    };
    try {
        const data = await client.send(new GetSecretValueCommand(params));
        if ("SecretString" in data && data.SecretString !== undefined) {
            const parsedData = JSON.parse(data.SecretString);
            return parsedData;
        }
        return null;
    } catch (error) {
        throw error;
    }
}