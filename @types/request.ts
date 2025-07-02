import { User } from "@/domain/entities-pg/user.entity";
import { OrganizationRole } from "./user";

export interface AppTokenPayload {
  iat : number;
  exp : number;
  user : User
}