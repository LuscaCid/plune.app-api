import { Model } from "mongoose";
import { User } from "../../@types/user";

export class UserRepository {
  constructor(
    private readonly userModel : Model<User>
  ) 
  {}
}