import { Model } from "mongoose"
import { IModelProps } from "../model-builder/types"
import { buildResponse } from "../../utils"
import { Request, Response } from "express"
import { validationResult } from "express-validator"

export const create = <IModel>(
  currentModel: Model<IModel>,
  hasValidations: boolean
) => {

  return async (req: Request, res: Response) => {
    try {

      if (hasValidations) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return buildResponse(res, {
          message: 'invalid_params',
          status: false,
          errors: errors.array(),
          code: 400
        });
      }

      const body = req.body;

      const createdModel = new currentModel(body);

      const storedDocument = await createdModel.save();

      if (!storedDocument) return buildResponse(res, {
        status: false,
        code: 500,
        message: 'error_save_document'
      });

      return buildResponse(res, {
        status: true,
        code: 201,
        message: 'saved_document',
        body: storedDocument
      });;
      
    } catch (error: any) {
      console.log(error);
      return buildResponse(res, {
        message: 'internal_error',
        status: false,
        code: 500
      });
    }
  }
  
}

export const findOne = <IModel>(
  currentModel: Model<IModel>,
  paramKey: string = "id",
) => {
  return async (req: Request, res: Response) => {
    try {

      const param = req.params[paramKey];

      const findedDocument = currentModel.findById(param);

      return buildResponse(res, {
        code: 200,
        body: findedDocument,
        message: 'finded_document'
      });
      
    } catch (error: any) {
      console.log(error);
      return buildResponse(res, {
        message: 'internal_error',
        status: false,
        code: 500
      });
    }
  }
}

export const findAll = <IModel>(
  currentModel: Model<IModel>,
) => {
  return async (req: Request, res: Response) => {
    try {

      const findedDocuments = await currentModel.find();
      
      return buildResponse(res, {
        code: 200,
        body: findedDocuments,
        message: 'finded_documents'
      });
      
    } catch (error: any) {
      console.log(error);
      return res
        .json({
          message: error?.message,
        })
        .status(500);
    }
  }
}

export const updateOne = <IModel>(
  currentModel: Model<IModel>,
  paramKey: string = "id",
  hasValidations: boolean
) => {
  return async (req: Request, res: Response) => {
    try {

      if (hasValidations) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) return buildResponse(res, {
          message: 'invalid_params',
          status: false,
          errors: errors.array(),
          code: 400
        });
      }

      const param = req.params[paramKey];
      const body = req.body;

      const updatedDocument = await currentModel.findByIdAndUpdate(param, body, { new: true });

      if (!updatedDocument) return buildResponse(res, {
        code: 500,
        status: false,
        message: 'error_to_update'
      });

      return buildResponse(res, {
        code: 200,
        status: true,
        message: 'document_updated'
      });
      
    } catch (error: any) {
      console.log(error);
      return buildResponse(res, {
        message: 'internal_error',
        status: false,
        code: 500
      });
    }
  }
}

export const deleteOne = <IModel>(
  currentModel: Model<IModel>,
  paramKey: string = "id",
) => {
  return async (req: Request, res: Response) => {
    try {

      const param = req.params[paramKey];

      const updatedDocument = await currentModel.findByIdAndUpdate(param, { isDeleted: true }, { new: true });

      if (!updatedDocument) return buildResponse(res, {
        code: 500,
        status: false,
        message: 'error_to_delete'
      })

      return buildResponse(res, {
        code: 200,
        status: true,
        message: 'document_deleted'
      });
      
    } catch (error: any) {
      console.log(error);
      return buildResponse(res, {
        message: 'internal_error',
        status: false,
        code: 500
      });
    }
  }
}