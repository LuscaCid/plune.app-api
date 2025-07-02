import { Model } from "mongoose";
import { User } from "../../@types/user";
import { SignUpDto } from "@/application/http/dto/user-dto";
import { Repository } from "typeorm";

export class UserRepository {
  constructor(
    private readonly userModel: Repository<User>
  ) { }

  findByEmail = async (email: string) => {
    return await this.userModel.findOneBy({ email });
  }

  create = async (user: SignUpDto) => {
    return await this.userModel.save({...user, } as User) 
  }

  updateLastAccess = async (id: string) => {
    return await this.userModel
    .createQueryBuilder()
    .update()
    .set({ lastAccess : new Date() } as User)
    .where("id = :id", { id })
    .execute();
  }
  
}