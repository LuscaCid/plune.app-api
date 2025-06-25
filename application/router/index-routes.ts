import { FastifyInstanceZod } from "../../@types/fastify-instance-zod";
import { authGuard } from "../http/middleware/auth-guard";
import { nodesRouter } from "./nodes-routes";
import { organizationRouter } from "./organizations-routes";
import { userRouter } from "./user-routes";

export function Router (app : FastifyInstanceZod) {
  app.register((instance, options, done) => {
    instance.register((subInstance, opts, next) => {
      subInstance.addHook("preHandler", authGuard);
      subInstance.register(organizationRouter);
      subInstance.register(nodesRouter);
      next();
    }, { prefix : "private"});
  
    instance.register(userRouter);
    done();
  }, { prefix: "api"});
  
}