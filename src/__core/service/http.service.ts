require('dotenv').config();
import { httpMessage } from '../constants';

type HttpMessage = {
  [key: string]: { code: string; message: string };
};

/**
 * @description Wraps a promise in error handling and logging logic.
 * @param promise The promise to handle.
 * @returns The resolved value of the promise.
 * @throws The error thrown by the promise.
 */
export async function handlePromise<T>(
  promise: Promise<T>,
): Promise<T | string> {
  try {
    return (await promise) as T;
  } catch (error) {
    return httpMessage[10203].code;
  }
}

/**
 * @description Wraps a promise in error handling and logging logic.
 * @param code typeof string
 * @returns string or boolean
 */
export async function handlePromiseError<T>(code: string): Promise<T> {
  const httpMessages: HttpMessage = httpMessage;
  for (const key in httpMessages) {
    if (httpMessage.hasOwnProperty(key) && key === code) {
      return httpMessages[key].code as T;
    }
  }
  return false as T;
}
