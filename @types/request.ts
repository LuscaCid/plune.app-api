import { OrganizationRole } from "./user";

export interface AppTokenPayload {
  sub : number;
  iat : number;
  exp : number;
  name : string;
  id : string;
  organizationRoles : OrganizationRole[];
}