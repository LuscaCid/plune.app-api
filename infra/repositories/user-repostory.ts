import { Model } from "mongoose";
import { User } from "../../@types/user";
import { SignUpDto } from "@/application/http/dto/user-dto";
import { Repository } from "typeorm";

export class UserRepository {
  constructor(
    private readonly userRepo: Repository<User>
  ) { }

  findByEmail = async (email: string) => {
    return await this.userRepo.findOneBy({ email });
  }

  create = async (user: SignUpDto) => {
    return await this.userRepo.save({ ...user, } as User)
  }

  findManyByEmail = async (email: string) => {
    return await this.userRepo.createQueryBuilder('user')
      .addSelect(["user.name", "user.email", "user.id", "user.avatar"])
      .where("user.email ILIKE :email", { email: `%${email}%` })
      .limit(10)
      .orderBy({ email: "ASC" })
      .getMany();

  }
  updateLastAccess = async (id: string) => {
    return await this.userRepo
      .createQueryBuilder()
      .update()
      .set({ lastAccess: new Date() } as User)
      .where("id = :id", { id })
      .execute();
  }

}