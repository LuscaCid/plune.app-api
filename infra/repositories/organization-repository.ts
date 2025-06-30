import { SaveOrgDto } from "@/application/http/dto/organization-dto";
import { Organization } from "@/domain/entities-pg/organization.entity";
import { UserOrganizationRole } from "@/domain/entities-pg/user-organization.entity";
import { Repository } from "typeorm";

export class OrganizationRepository {
  constructor(
    private readonly organizationRoleRepo: Repository<UserOrganizationRole>,
    private readonly organizationRepo: Repository<Organization>
  ) { }
  findUserOrganizations = async (userId: string) => {
    return await this.organizationRoleRepo
      .createQueryBuilder("orp")
      .innerJoinAndSelect("orp.organization", "organization")
      .innerJoinAndSelect("orp.user", "user")
      .where("user.id = :id", { id: userId })
      .getMany();
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
  create = async (org: SaveOrgDto) => {
    return await this.organizationRepo.insert(org);
  }
  update = async (orgPayload: SaveOrgDto) => {
    return await this.organizationRepo
      .createQueryBuilder()
      .update()
      .set(orgPayload as Organization)
      .execute();
  }
  saveUsersInOrganization = async (organizationId: string, usersIds: string[]) => {
    for (const id of usersIds) {
      const userAlreadyInOrganization = await this.organizationRoleRepo.findOneBy({ user: { id } });
      if (userAlreadyInOrganization) {  
        userAlreadyInOrganization
      }
    }
    // return await this.organizationRoleRepo.inser
  }
}