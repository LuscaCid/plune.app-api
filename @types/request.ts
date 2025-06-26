import { OrganizationRole, User } from "./user";

export interface AppTokenPayload {
  iat : number;
  exp : number;
  user : User
}