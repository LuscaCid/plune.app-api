import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { flowInstanceModel, flowTemplateModel } from "@/domain/models/flow";
import { FlowService } from "@/domain/services/flow-service";
import { FlowInstanceRepository } from "@/infra/repositories/flow-instance-repository";
import { FlowTemplateRepository } from "@/infra/repositories/flow-template-repository";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const registerFlow: FastifyPluginAsync = async (app: FastifyInstanceZod) => {
  const flowInstanceRepository = new FlowInstanceRepository(flowInstanceModel);
  const flowTemplateRepository = new FlowTemplateRepository(flowTemplateModel);

  const flowInstanceService = new FlowService(flowInstanceRepository);
  const flowTemplateService = new FlowService(flowTemplateRepository);
  app.decorate("flowInstanceService", flowInstanceService);
  app.decorate("flowTemplateService", flowTemplateService);
}

export const flowPlugin = fp(registerFlow);