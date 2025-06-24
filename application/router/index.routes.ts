import { FastifyInstanceZod } from "../../@types/fastify-instance-zod";
import { nodesRouter } from "./nodes.routes";

export function Router (app : FastifyInstanceZod) {
  app.register((instance, options, done) => {
    instance.register(nodesRouter);
    done()
  }, { prefix: "api"});
  
}