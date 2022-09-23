import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { body, validationResult } from "express-validator"
import { UserModel } from "../models"
import { Request, Response } from "express"
import { env, buildResponse } from "../utils"

interface RegisterBodyParams {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export const registerValidationMiddlewares = [
  body('name').notEmpty(),
  body('lastname').notEmpty(),
  body('email').isEmail(),
  body('password').notEmpty()
];

export const register = async (req: Request, res: Response) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) return buildResponse(res, {
      message: 'invalid_params',
      status: false,
      errors: errors.array(),
      code: 400
    });
      
    const bodyParams: RegisterBodyParams = {...req.body};

    bodyParams.password = bcrypt.hashSync(bodyParams.password, 12);

    const user = new UserModel(bodyParams);

    const createdUser = await user.save();

    if (!createdUser) return buildResponse(res, {
        message: 'create_user_error',
        status: false,
        code: 500
      });

    return buildResponse(res, {
      message: 'user_created',
      code: 201
    });
    
  } catch (error: any) {
    console.log(error?.message);

    return buildResponse(res, {
      message: 'internal_error',
      status: false,
      code: 500
    });
  }
}

interface LoginBodyParams {
  email: string; 
  password: string;
}

export const loginValidatorMiddlewares = [
  body('email').notEmpty().isEmail(),
  body('password').notEmpty()
]

export const login = async (req: Request, res: Response) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) return buildResponse(res, {
      message: 'invalid_params',
      status: false,
      errors: errors.array(),
      code: 400
    });

    const bodyParams: LoginBodyParams = {...req.body};

    const findedUser = await UserModel.findOne({ email: bodyParams.email, isDeleted: false });

    if (!findedUser) return buildResponse(res, {
        message: 'incorrect_password',
        status: false,
        code: 404
      })

    const isCorrectPassword = bcrypt.compareSync(bodyParams.password, findedUser.password);

    if (!isCorrectPassword) return buildResponse(res, {
        message: 'incorrect_password',
        status: false,
        code: 400
      })

    const token = jwt.sign({
      _id: findedUser._id
    }, env().JWT_KEY, {
      expiresIn: "24h"
    });

    return buildResponse(res, {
      message: 'user_authenticated',
      status: true,
      code: 200,
      body: { token }
    })
    
  } catch (error) {
    console.log(error);
    
    return buildResponse(res, {
      message: 'internal_error',
      status: false,
      code: 500,
    })
  }
}