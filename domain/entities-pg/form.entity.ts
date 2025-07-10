import { FormField } from "@/@types/Form";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./organization.entity";

@Entity({ name: "form", synchronize: true })
export class Form {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: "name", type: "text" })
  name: string;

  @Column({ name: "formFields", type: "jsonb" })
  formFields: FormField[];

  @ManyToOne(() => Organization)
  @JoinColumn({ name : "organizationId" })
  organization : Organization;
}