import { FormField } from "@/@types/Form";
import { SaveFormDTO } from "@/application/http/dto/flow-dto";
import { Form } from "@/domain/entities-pg/form.entity";
import { Organization } from "@/domain/entities-pg/organization.entity";
import { Repository } from "typeorm";
import { AppError } from "../utils/AppError";
import { User } from "@/domain/entities-pg/user.entity";

export class FormRepository {
  constructor(
    private readonly formRepo: Repository<Form>
  ) { }
  saveForm = async (form: SaveFormDTO, user: User) => {

    if (form.id) {
      const existingForm = await this.getFormById(form.id);
      if (!existingForm) {
        throw new AppError("Form for update not found", 404);
      }
      existingForm.formFields = form.fields ? form.fields as FormField[] : existingForm.formFields;
      existingForm.name = form.name;

      return await this.formRepo.save(existingForm);
    }
    const newForm = new Form();

    Object.assign(newForm, form);
    newForm.organization = { id: form.organizationId } as Organization;
    newForm.formFields = form.fields as FormField[];
    newForm.createdBy = { id: user.id } as User;
    return await this.formRepo.save(newForm)
  }
  getOrganizationForms = async (organizationId: number) => {
    return await this.formRepo.createQueryBuilder("form")
      .leftJoin("form.createdBy", "user")
      .addSelect([
        "user.name",
        "user.email",
        "user.avatar",
      ])
      .where("form.organizationId = :id", { id: organizationId })
      .orderBy("form.name", "ASC")
      .getMany();
  }
  // restante dos metodos para o form

  getFormById = async (id: number) => {
    return await this.formRepo.findOneBy({ id });
  }

}