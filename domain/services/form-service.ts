import { FormRepository } from "@/infra/repositories/form-repository";

export class FormService {
  constructor (
    private readonly formRepository : FormRepository
  ){}

  getOrganizationForms = async () => {
    
  }
}