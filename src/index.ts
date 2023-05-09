require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import useragent from 'express-useragent';
import { getAwsSecrets } from "./__core/utils";
const app = express();

async function runApp() {
    const secrets = await getAwsSecrets({
        awsSecretId:  process.env.AWS_SECRET_ID!,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    });
    
    let port = Number(process.env.PORT);
    let connectionString = process.env.CONNECTION_STRING!

    if(process.env.NODE_ENV === "production") {
        port = secrets?.PORT!;
        connectionString = secrets?.DB_CONNECTION_STRING!;
    }

    mongoose
        .set("strictQuery", false)
        .set("strictPopulate", false)
        .connect(connectionString)
        .then(() => console.log("DATABASE CONNECTED"))
        .catch(() => console.log("DABASE DISCONNECTED"));

    app.use(cors({ origin: "*" }));
    app.use(useragent.express());
    app.use(express.json());
    app.use(express.urlencoded({ limit: '25mb', extended: true }));
    
    app.get('/', (req, res) => res.send('Express Typescript on Vercel'));
    app.use("/api/v1", require("./controllers/security.controller"));
    app.use("/api/v1", require("./controllers/auth.controller"));

    app.listen(port, () => {
        console.log(`RUNNING ON ${process.env.NODE_ENV}`)
        console.log(`RUNNING ON ${port}`)
    });

}

runApp();