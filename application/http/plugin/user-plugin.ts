import { FastifyPluginAsync } from "fastify";
import { FastifyInstanceZod } from "../../../@types/fastify-instance-zod";
import { connectDatabase } from "../../../infra/database/connection";
import { UserRepository } from "../../../infra/repositories/user-repostory";
import { userModel } from "../../../domain/models/user";
import { UserService } from "../../../domain/services/user-service";
import fp from "fastify-plugin";
import { User } from "@/domain/entities-pg/user.entity";

const registerUser: FastifyPluginAsync = async (app: FastifyInstanceZod) => {
  const userRepo = app.dataSource.getRepository(User);
  const userRepository = new UserRepository(userRepo);
  const userService = new UserService(userRepository);
  app.decorate("userService", userService);

}
export const userPlugin = fp(registerUser);