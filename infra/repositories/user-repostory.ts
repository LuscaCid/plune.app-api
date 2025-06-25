import { Model } from "mongoose";
import { User } from "../../@types/user";
import { SignUpDto } from "@/application/http/dto/user-dto";

export class UserRepository {
  constructor(
    private readonly userModel: Model<User>
  ) { }

  findByEmail = async (email: string) => {
    return await this.userModel.findOne({ email });
  }

  create = async (user: SignUpDto) => {
    return await this.userModel.create(user)
  }

  updateLastAccess = async (_id: string) => {
    return await this.userModel.findOneAndUpdate({ _id }, { $set: { lastAccess: new Date() } })
  }

}