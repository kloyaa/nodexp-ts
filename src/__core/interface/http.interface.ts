import { httpMessage } from '../constants';

export type HttpMessageKey = {
  [code: string]: {
    message: string;
    key: keyof typeof httpMessage;
  };
};
