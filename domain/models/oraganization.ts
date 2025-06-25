import { Organization as IOrganization } from "@/@types/organization";
import { model, Schema } from "mongoose";
import { User, userSchema } from "./user";

export class Organization implements IOrganization {
  createdBy!: string;
  name!: string;
  users!: User[];
  
}

const organizationSchema = new Schema<IOrganization>({
  createdBy : { type : String, required : true },
  name : { type : String, required : true },
  users : { type : [userSchema], required : false },
})

export const organizationModel = model<IOrganization>("organization", organizationSchema, "organization");