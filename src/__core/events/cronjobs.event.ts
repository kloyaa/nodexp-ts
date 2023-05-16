require("dotenv").config();
import { CronJob } from "cron"
import { CronExpression } from "../enum";

const cron = (exression: CronExpression, func: Function) => {
  const timezone = process.env.TZ || "Asia/Manila";
  const startOnInit: boolean = true;
  const startNow: boolean = true;
  const context: any = null;
  const onComplete: any = null;
  return new CronJob(exression, () => func(), onComplete, startNow, timezone, context, startOnInit);
}

function runJobs() {
  cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, () => {
    console.log("SHOULD RUN EVERY_DAY_AT_MIDNIGHT");
  });
  cron(CronExpression.EVERY_DAY_AT_NOON, () => {
    console.log("SHOULD RUN EVERY_DAY_AT_NOON");
  });
}

runJobs();



