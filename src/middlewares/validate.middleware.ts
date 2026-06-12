import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateDTO(dto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dto, req.body);

    const errors = await validate(instance, {
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation error",
        errors: errors.map((e) => Object.values(e.constraints ?? {})).flat(),
      });
    }

    req.body = instance;
    next();
  };
}
