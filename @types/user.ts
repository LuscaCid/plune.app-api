import { Document, ObjectId } from "mongodb";
export type Roles = 'Admin' | 'Editor' | 'Approver' | 'Viewer';

export interface User extends Document {
  name : string;
  email : string;
  password? : string;
  organizationsRoles : OrganizationRole[];
  avatar? : string;
}

export interface OrganizationRole {
  organizationId: string
  organizationName: string
  organizationLogo: string
  role: Roles
}