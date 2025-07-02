import { Organization } from "@/@types/organization";
import { SaveOrgDTO } from "@/application/http/dto/organization-dto";
import { OrganizationRepository } from "@/infra/repositories/organization-repository";
import { AppError } from "@/infra/utils/AppError";
import { User } from "../entities-pg/user.entity";

export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,

  ) { }
  getOrganizationUsers = async (orgId: string) => {
    return await this.organizationRepository.findOrganizationUsers(orgId);
  }
  getUserOrganizations = async (userId: string) => {
    return await this.organizationRepository.findUserOrganizations(userId);
  }
  save = async (payload: SaveOrgDTO, user : User) => {
    const organizationWithSameName = await this.organizationRepository.findByName(payload.name!);

    //validates the insertion of a new organization or updating with an name that's already registered on database
    if (
      (organizationWithSameName && !payload.id) ||
      (organizationWithSameName && payload.id && payload.id != organizationWithSameName.id)
    ) {
      throw new AppError("Organization with same name already registered", 401)
    }
    const savedOrganization = await this.organizationRepository.save(payload, user);

    savedOrganization.id && await this.organizationRepository.saveUsersInOrganization(savedOrganization.id, payload.users);

    return savedOrganization;
  }
  saveUsersInOrganization = async (payload: SaveOrgDTO) => {
    return await this.organizationRepository.saveUsersInOrganization(payload.id!, payload.users)
  }

  delete = async (id: string) => {
    return await this.organizationRepository.delete(id);
  }
}