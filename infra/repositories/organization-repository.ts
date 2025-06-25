import { Organization } from "@/@types/organization";
import { SaveOrgDto } from "@/application/http/dto/organization-dto";
import { organizationModel } from "@/domain/models/oraganization";
import { Model } from "mongoose";

export class OrganizationRepository {
  constructor(
    private readonly organizationModel: Model<Organization>
  ) { }
  findUserOrganizations = async (userId: string) => {
    return await this.organizationModel.find({ "$users.id" : userId })
  }
  findByName = async (name: string) => {
    return await this.organizationModel.findOne({ name });
  }
  findById = async (id: string) => {
    return await this.organizationModel.findOne({ id });
  }
  delete = async (id: string) => {
    return await this.organizationModel.findOneAndDelete({ id })
  }
  create = async (org: SaveOrgDto) => {
    return await this.organizationModel.create(org);
  }
  update = async (orgPayload: Organization) => {
    return await this.organizationModel.findOneAndUpdate({ id: orgPayload.id }, orgPayload);
  }
}