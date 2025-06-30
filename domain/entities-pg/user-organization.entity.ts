import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrganizationRoleType, User } from "./user.entity";
import { Organization } from "./organization.entity";
//many to many table thats define relation with column to set user role inside organization
@Entity("user_organization_roles")
export class UserOrganizationRole {
  @PrimaryGeneratedColumn({ name : 'id' })
  id: string;

  @ManyToOne(() => User, user => user.organizationRoles)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

  @Column({
    type: "enum",
    enum: ["Admin", "Editor", "Approver", "Viewer"]
  })
  role: OrganizationRoleType;
}
