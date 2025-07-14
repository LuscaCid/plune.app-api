import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { Form } from "@/domain/entities-pg/form.entity";
import { FormService } from "@/domain/services/form-service";
import { FormRepository } from "@/infra/repositories/form-repository";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const registerForm : FastifyPluginAsync = async (app : FastifyInstanceZod) => {
  const formRepo = app.dataSource.getRepository(Form);
  const formRepository = new FormRepository(formRepo);
  const formService = new FormService(formRepository);
  app.decorate("formService", formService);
}

export const formPlugin = fp(registerForm);