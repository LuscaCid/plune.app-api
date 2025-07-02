import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { Flow } from "@/domain/entities-pg/flow.entity";
import { FlowService } from "@/domain/services/flow-service";
import { FlowRepository } from "@/infra/repositories/flow-repository";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const registerFlow: FastifyPluginAsync = async (app: FastifyInstanceZod) => {
  const flowRepo = app.dataSource.getRepository(Flow);
  const flowRepository = new FlowRepository(flowRepo);

  const flowService = new FlowService(flowRepository);
  app.decorate("flowService", flowService);
}

export const flowPlugin = fp(registerFlow);