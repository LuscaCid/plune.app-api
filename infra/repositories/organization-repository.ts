import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { SaveOrgDTO, SaveUsersInOrganizationDTO } from "@/application/http/dto/organization-dto";
import { Organization } from "@/domain/entities-pg/organization.entity";
import { UserOrganizationRole } from "@/domain/entities-pg/user-organization.entity";
import { User } from "@/domain/entities-pg/user.entity";
import { Repository } from "typeorm";

export class OrganizationRepository {
  constructor(
    private readonly organizationRoleRepo: Repository<UserOrganizationRole>,
    private readonly organizationRepo: Repository<Organization>,
  ) { }

  findUserOrganizations = async (userId: string) => {
    return await this.organizationRoleRepo
      .createQueryBuilder("orp")
      .innerJoinAndSelect("orp.organization", "organization")
      .innerJoin("orp.user", "user")
      .where("user.id = :id", { id: userId })
      .getMany();
  }
  findOrganizationUsers = async (orgId: string) => {
    return await this.organizationRoleRepo.createQueryBuilder("orp")
      .innerJoin("orp.organization", "organization")
      .innerJoin("orp.user", "user")
      .addSelect(["user.name", "user.email"])
      .where("organization.id = :id", { id: orgId })
      .getMany()
  }
  findByName = async (name: string) => {
    return await this.organizationRepo.findOneBy({ name });
  }
  findById = async (id: string) => {
    return await this.organizationRepo.findOne({ where: { id } });
  }
  delete = async (id: string) => {
    return await this.organizationRepo.softDelete({ id })
  }
  save = async (org: SaveOrgDTO, user: User) => {
    let savingOrg: Organization | null = null;

    if (org.id) savingOrg = await this.findById(org.id)

    if (savingOrg) {
      savingOrg.name = org.name ?? savingOrg.name;
      return await this.organizationRepo.save(savingOrg);
    }

    const organization = new Organization();
    organization.createdAt = new Date();
    organization.createdBy = { id: user.id } as User;
    organization.name = org.name!;

    return await this.organizationRepo.save(organization);
  }
  saveUsersInOrganization = async (organizationId: string, users: SaveUsersInOrganizationDTO) => {
    if (users) {
      for (const user of users) {
        const userAlreadyInOrganization = await this.organizationRoleRepo.findOneBy({
          user: { id: user.id },
          organization: { id: organizationId }
        });
        // in case of exists, it will update role
        if (userAlreadyInOrganization) {
          await this.organizationRoleRepo
            .createQueryBuilder()
            .update()
            .set({ ...userAlreadyInOrganization, role: user.role })
            .execute();
          continue;
        }
        await this.organizationRoleRepo.save({
          organization: { id: organizationId },
          role: user.role,
          user: { id: user.id }
        });
      }
    }
  }
}