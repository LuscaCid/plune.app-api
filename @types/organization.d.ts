import { User } from "./user";

export interface Organization {
  name : string;
  createdBy : string;
  users : User[],
}