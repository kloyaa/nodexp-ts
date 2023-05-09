import { SecretsManagerClient, GetSecretValueCommand, SecretsManagerClientConfig } from "@aws-sdk/client-secrets-manager";
import { AwsSecretsResult } from "../interface";

interface AwsSecretsPayload {
    awsSecretId: string;
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
}

export const getAwsSecrets = async (data: AwsSecretsPayload): Promise<AwsSecretsResult | null> => {
    const clientConfig: SecretsManagerClientConfig = {
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: data.awsAccessKeyId,
            secretAccessKey: data.awsSecretAccessKey,
        }
    };
    const client = new SecretsManagerClient(clientConfig);
    const params = {
        SecretId: data.awsSecretId,
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
        console.error(error);
        return null;
    }
}