import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./organization.entity";
import { Form } from "./form.entity";

@Entity({ name: "form_submission" })
export class FormSubmission {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "formId", type: "number" })
  formId: number;

  @Column({ name: "organizationId", type: "number" })
  organizationId: number;

  @CreateDateColumn()
  submittedAt: Date;

  @Column({ name: "values", type: "jsonb" })
  values: Record<string, any>;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: "organizationId" })
  organization: Organization

  @ManyToOne(() => Form)
  @JoinColumn({ name: "formId" })
  form: Form;

}
