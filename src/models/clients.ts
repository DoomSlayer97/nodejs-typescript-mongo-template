import { buildModel, IModelProps } from '../extensions'

export interface IClientModel extends IModelProps {
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

const schemaProps = {
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
};

const modelName = 'Client';

const {
  model: ClientModel,
  schema: ClientSchema
} = buildModel<IClientModel>({
  name: modelName,
  schemaData: schemaProps,
  fakeDelete: true,
  timeStamps: true
});

export {
  ClientModel,
  ClientSchema
}
