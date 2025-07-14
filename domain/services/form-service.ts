import { SaveFormDTO } from "@/application/http/dto/flow-dto";
import { FormRepository } from "@/infra/repositories/form-repository";
import { User } from "../entities-pg/user.entity";

export class FormService {
  constructor(
    private readonly formRepository: FormRepository
  ) { }

  getOrganizationForms = async (orgId: number) => {
    return await this.formRepository.getOrganizationForms(orgId);
  }

  saveOrganizationForm = async (form : SaveFormDTO, user: User) => {
    return await this.formRepository.saveForm(form, user);
  }

  deleteForm = async () => {

  }
}