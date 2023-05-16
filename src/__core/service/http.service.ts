import { Response } from "express";
import { httpMessage } from "../constants";
import { winstonLogger } from "../utils";

type HttpMessage = {
  [key: string]: { code: string; message: string };
};


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

export async function handlePromiseError<T>(code: string): Promise<T> {
  const httpMessages: HttpMessage  = httpMessage;
  for (const key in httpMessages) {
    if (httpMessage.hasOwnProperty(key) && key === code) {
      return httpMessages[key].code as T;
    }
  }
  return false as T;
}