import { Model } from 'mongoose'
import * as crudFunctions from './functions'

interface IHasFunctionValidationsParams {
  create: boolean;
  update: boolean;
}

interface ICrudBuilderProps<IModel> {
  model: Model<IModel>;
  paramKey: string;
  hasValidations: IHasFunctionValidationsParams
}

export const crudBuilder = <ModelProp> (
  props: ICrudBuilderProps<ModelProp>
) => {

  const routerCrudFunctions = {
    create: crudFunctions.create<ModelProp>(props.model, props.hasValidations.create),
    findOne: crudFunctions.findOne<ModelProp>(props.model, props.paramKey),
    findAll: crudFunctions.findAll<ModelProp>(props.model),
    updateOne: crudFunctions.updateOne<ModelProp>(props.model, props.paramKey, props.hasValidations.update),
    deleteOne: crudFunctions.deleteOne<ModelProp>(props.model, props.paramKey),
  };

  return routerCrudFunctions;

}