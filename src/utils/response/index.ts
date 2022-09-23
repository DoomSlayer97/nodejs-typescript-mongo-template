import { Response } from "express"

interface BuildResponseParams {
  body?: any;
  status?: boolean;
  message: string;
  code?: number;
  errors?: any[];
}


export const buildResponse = (res: Response, {
  body,
  status = true,
  message = '',
  errors,
  code = 200,
}: BuildResponseParams) => {

  res
    .status(code)
    .json({
      body,
      status,
      message,
      code,
      errors
    });
}