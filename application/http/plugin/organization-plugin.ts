import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { organizationModel } from "@/domain/models/oraganization";
import { OrganizationService } from "@/domain/services/organization-service";
import { OrganizationRepository } from "@/infra/repositories/organization-repository";
import fp from "fastify-plugin";

function registerOrganization(app: FastifyInstanceZod) {
  const organizationRepository = new OrganizationRepository(organizationModel);
  const organizationService = new OrganizationService(organizationRepository);
  app.decorate("organizationService", organizationService);
}
export const organizationPlugin = fp(registerOrganization);