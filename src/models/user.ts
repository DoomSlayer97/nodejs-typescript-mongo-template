import { buildModel, IModelProps } from '../extensions'

export interface IUserModel extends IModelProps {
  name: string;
  lastname: string;
  email: string;
  password: string;
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
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
};

const modelName = 'User';

const {
  model: UserModel,
  schema: UserSchema,
} = buildModel<IUserModel>({
  name: modelName,
  schemaData: schemaProps,
  fakeDelete: true,
  timeStamps: true
});

export {
  UserModel,
  UserSchema
}