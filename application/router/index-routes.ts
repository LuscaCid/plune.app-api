import { FastifyInstanceZod } from "../../@types/fastify-instance-zod";
import { authGuard } from "../http/middleware/auth-guard";
import { flowRouter } from "./flow-routes";
import { formRouter } from "./form-routes";
import { nodesRouter } from "./nodes-routes";
import { organizationRouter } from "./organizations-routes";
import { userRouter } from "./user-routes";

export function Router (app : FastifyInstanceZod) {
  app.register((instance, options, done) => {
    //protected routes by auth_guard
    instance.register((subInstance, opts, next) => {
      subInstance.addHook("preValidation", authGuard);
      subInstance.register(organizationRouter);
      subInstance.register(nodesRouter);
      subInstance.register(flowRouter);
      subInstance.register(formRouter);
      next();
    });
  
    //public routes
    instance.register(userRouter);
    done();
  }, { prefix: "api"});
  
}