export enum OrganizationRole {

}
export interface AppTokenPayload {
  sub : number;
  iat : number;
  exp : number;
  name : string;
  id : string;
  organizationRoles : OrganizationRole[];
}