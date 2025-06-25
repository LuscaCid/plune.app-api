import { User as IUser, OrganizationRole } from "../../@types/user";
import { model, Schema } from "mongoose";

export class User implements IUser {
  avatar?: string | undefined;
  email!: string;
  name!: string;
  password!: string;
  organizationsRoles!: OrganizationRole[];
  currentSelectedOrganization? : OrganizationRole;
}

export const organizationRoleSchema = new Schema<OrganizationRole>({
  organizationId: { type: String, required: true },
  organizationName: { type: String, required: true },
  organizationLogo: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'Editor', 'Approver', 'Viewer'],
    required: true,
  }
})

export const userSchema = new Schema<IUser>({
  avatar: { type: String, required: false },
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  organizationsRoles: [organizationRoleSchema]
})

export const userModel = model<IUser>('user', userSchema, "user");  