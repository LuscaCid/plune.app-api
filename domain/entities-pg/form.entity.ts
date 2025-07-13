import { FormField } from "@/@types/Form";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./organization.entity";
import { User } from "./user.entity";

@Entity({ name: "form", synchronize: true })
export class Form {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: "name", type: "text" })
  name: string;

  @Column({ name: "formFields", type: "jsonb", nullable: true, default: [] })
  formFields: FormField[];

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date

  @Column({ name: "organizationId", type: "number" })
  organizationId: number;

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "createdBy" })
  createdBy: User;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: "organizationId" })
  organization: Organization;
}