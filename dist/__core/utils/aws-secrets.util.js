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
exports.getAwsSecrets = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const getAwsSecrets = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const clientConfig = {
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: data.awsAccessKeyId,
            secretAccessKey: data.awsSecretAccessKey,
        }
    };
    const client = new client_secrets_manager_1.SecretsManagerClient(clientConfig);
    const params = {
        SecretId: data.awsSecretId,
        VersionStage: "AWSCURRENT",
    };
    try {
        const data = yield client.send(new client_secrets_manager_1.GetSecretValueCommand(params));
        if ("SecretString" in data && data.SecretString !== undefined) {
            const parsedData = JSON.parse(data.SecretString);
            return parsedData;
        }
        return null;
    }
    catch (error) {
        throw error;
    }
});
exports.getAwsSecrets = getAwsSecrets;
//# sourceMappingURL=aws-secrets.util.js.map