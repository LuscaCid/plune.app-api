import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserOrganizationRole } from "./user-organization.entity";
import { Flow } from "./flow.entity";

export type OrganizationRoleType = "Admin" | "Editor" | "Approver" | "Viewer";

@Entity({ name: "user", synchronize: true })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

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
  @OneToMany(() => Flow, (flow) => flow.user)
  flows?: Flow[];
}