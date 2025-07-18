import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserOrganizationRole } from "./user-organization.entity";
import { Flow } from "./flow.entity";
import { Form } from "./form.entity";

export type OrganizationRoleType = "Admin" | "Editor" | "Approver" | "Viewer";

@Entity({ name: "user", synchronize: true })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: "name", type: "text" })
  name: string;

  @Column({ unique: true, name: "email", type: "text" })
  email: string;

  @Column({ name: "password", type: "text" })
  password: string;

  @Column({ nullable: true, name: "avatar", type: "text" })
  avatar?: string;

  @Column({ type: "date", default: new Date(), name: "lastAccess" })
  lastAccess: Date;

  @ManyToMany(() => UserOrganizationRole, role => role.user)
  organizationRoles?: UserOrganizationRole[];

  // relationship for created flows by users
  @OneToMany(() => Flow, (flow) => flow.createdBy)
  flows?: Flow[];

  @OneToMany(() => Form, (form) => form.createdBy)
  forms?: Form[]
}