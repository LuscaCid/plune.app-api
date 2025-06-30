import { Organization } from "@/@types/organization";
import { User } from "@/@types/user";
import { SaveOrgDto } from "@/application/http/dto/organization-dto";
import { OrganizationRepository } from "@/infra/repositories/organization-repository";
import { AppError } from "@/infra/utils/AppError";

export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,

  ) { }

  getUserOrganizations = async (userId: string) => {
    return await this.organizationRepository.findUserOrganizations(userId);
  }
  save = async (payload: SaveOrgDto) => {
    const organizationWithSameName = await this.organizationRepository.findByName(payload.name);
    if (
      (organizationWithSameName && !payload.orgId) ||
      (payload.orgId && organizationWithSameName && payload.orgId != organizationWithSameName?.id)
    ) {
      throw new AppError("Organization with this name already registered", 401);
    }
    return await this.organizationRepository.create(payload);
  }

  update = async (payload: SaveOrgDto) => {
    if (!payload.orgId) {
      throw new AppError("Organization id is necessary", 403)
    }
    const newUsersInRequest = payload.users;

    const organizationInDatabase = await this.organizationRepository.findById(payload.orgId);
    if (!organizationInDatabase) {
      throw new AppError("Organization for update not found", 404)
    }
    const updatePayload = {
      createdBy: organizationInDatabase.createdBy,
      name: organizationInDatabase.name,
    } as Organization;

    // const newUsersListed = newUsersInRequest ? newUsersInRequest.filter((newUser) => organizationInDatabase.users.find(actual => actual.id == newUser.id)) as User[] : [];

    // if (newUsersListed) {
    //   updatePayload.users = newUsersListed;
    // }
    return await this.organizationRepository.update(updatePayload)
  }

  saveUsersInOrganization = async (organizationId: string, usersIds: string[]) => {
    return await this.organizationRepository.
  }

  delete = async (id: string) => {
    return await this.organizationRepository.delete(id);
  }
}