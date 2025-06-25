import { User } from "./user";
import { Document } from "mongodb"
export interface Organization extends Document{
  name : string;
  createdBy : string;
  users : User[],
}