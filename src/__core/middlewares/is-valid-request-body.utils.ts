import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

/**
 * @description sequential processing, stops running validations chain if the previous one fails.
 * @param validations array of validation chains
 * @returns next() if no errors, else returns 400 with errors
 */
export const expressMiddlewares = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result: any = await validation.run(req);
      if (result.errors.length) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    res.status(400).json({ errors: errors.array() });
  };
};
