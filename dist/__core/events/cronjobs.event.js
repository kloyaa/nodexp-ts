"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cron_1 = require("cron");
const enum_1 = require("../enum");
const cron = (exression, func) => {
    const timezone = process.env.TZ || "Asia/Manila";
    const startOnInit = false;
    const startNow = true;
    const context = null;
    const onComplete = null;
    return new cron_1.CronJob(exression, () => func(), onComplete, startNow, timezone, context, startOnInit);
};
function runJobs() {
    cron(enum_1.CronExpression.EVERY_10_SECONDS, () => {
        console.log("SHOULD RUN EVERY_10_SECONDS");
    });
    cron(enum_1.CronExpression.EVERY_DAY_AT_NOON, () => {
        console.log("SHOULD RUN EVERY_DAY_AT_NOON");
    });
}
runJobs();
//# sourceMappingURL=cronjobs.event.js.map