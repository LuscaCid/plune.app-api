import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { Organization } from "@/domain/entities-pg/organization.entity";
import { UserOrganizationRole } from "@/domain/entities-pg/user-organization.entity";
import { OrganizationService } from "@/domain/services/organization-service";
import { OrganizationRepository } from "@/infra/repositories/organization-repository";
import fp from "fastify-plugin";

function registerOrganization(app: FastifyInstanceZod) {
  const organizationRoleRepo = app.dataSource.getRepository(UserOrganizationRole);
  const organizationRepo = app.dataSource.getRepository(Organization);

  //DI
  const organizationRepository = new OrganizationRepository(
    organizationRoleRepo,
    organizationRepo,
  );

  const organizationService = new OrganizationService(organizationRepository);
  app.decorate("organizationService", organizationService);
}
export const organizationPlugin = fp(registerOrganization);