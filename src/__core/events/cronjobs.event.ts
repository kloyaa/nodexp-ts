require('dotenv').config();
import { CronJob } from 'cron';
import { CronExpression } from '../enum';

const cron = (exression: CronExpression, func: Function) => {
  const timezone = process.env.DEFAULT_TZ || 'Asia/Manila';
  const startOnInit: boolean = false;
  const startNow: boolean = true;
  const context: any = null;
  const onComplete: any = null;
  return new CronJob(
    exression,
    () => func(),
    onComplete,
    startNow,
    timezone,
    context,
    startOnInit,
  );
};

function runJobs() {
  cron(CronExpression.EVERY_10_SECONDS, () => {
    console.log('SHOULD RUN EVERY_10_SECONDS');
  });
  cron(CronExpression.EVERY_DAY_AT_NOON, () => {
    console.log('SHOULD RUN EVERY_DAY_AT_NOON');
  });
}

runJobs();
