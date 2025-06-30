import { Document } from "mongodb"
export interface Organization extends Document {
  name: string;
  createdBy: string;
  photoUrl?: string;
  email?: string;
}