import { httpMessage } from "../constants";
import { winstonLogger } from "../utils";

/**
 * @description Wraps a promise in error handling and logging logic.
 * @param promise The promise to handle.
 * @returns The resolved value of the promise.
 * @throws The error thrown by the promise.
 */
export async function handlePromise<T>(promise: Promise<T>): Promise<T | string> {
  try {
    return await promise as T;
    } catch (error) {
      winstonLogger.error(error);
      return httpMessage[10203].code;
    }
}
  