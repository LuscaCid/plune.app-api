import { OrganizationRole } from "./user";

export interface UserOrganization {
  organizationId: string;
  userId: string;
  role : OrganizationRole;
  
}