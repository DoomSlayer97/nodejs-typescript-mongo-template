import mongoose from "mongoose"
import { IModelProps } from "./types"
export * from './types'

interface IBuildModelProps {
  schemaData: Object;
  name: string;
  timeStamps: boolean;
  fakeDelete: boolean;
}

export const buildModel = <PropModel extends IModelProps> (props: IBuildModelProps) => {

  const isDeletedSchemaProp = props.fakeDelete ?
    {
      isDeleted: {
        type: Boolean,
        default: false
      }
    }
    : null;

  const newSchema = new mongoose.Schema({
    ...props.schemaData,
    ...isDeletedSchemaProp
  }, { 
    timestamps: props.timeStamps
  });

  const model = mongoose.model<PropModel>(props.name, newSchema);

  return {
    model,
    schema: newSchema
  }

}
