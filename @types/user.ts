import { Document, ObjectId } from "mongodb";
export type Roles = 'Admin' | 'Editor' | 'Approver' | 'Viewer';

export interface User extends Document {
  id: string;
  name : string;
  email : string;
  password : string;
  lastAccess?: Date;
  avatar? : string;
}

export interface OrganizationRole {
  organizationId: string
  role: Roles
}