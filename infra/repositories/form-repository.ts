import { Form } from "@/domain/entities-pg/form.entity";
import { Repository } from "typeorm";

export class FormRepository {
  constructor (
    private readonly formRepo : Repository<Form>
  ) {}

  getOrganizationForms = async (organizationId : string) => {
    
    const queryBuilder = this.formRepo.createQueryBuilder("form");
  }
}