import { body } from "express-validator"
import { IClientModel, ClientModel } from "../models"
import { crudBuilder } from "../extensions"

const {
  create,
  findAll,
  findOne,
  updateOne,
  deleteOne
} = crudBuilder<IClientModel>({
  model: ClientModel,
  paramKey: 'id',
  hasValidations: {
    create: true,
    update: true
  }
});

export const bodyValidationMiddlewares = [
  body('name').notEmpty(),
  body('lastname').notEmpty(),
  body('email').isEmail(),
  body('phone').notEmpty(),
]

export {
  create,
  findAll,
  findOne,
  updateOne,
  deleteOne
}