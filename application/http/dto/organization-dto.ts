import { Roles, User } from "@/@types/user";
import { z } from "zod";

export class OrganizationDto {
  static userOrg = z.object({
    id: z.number().min(1),
    role: z.enum(["Admin", "Viewer", "Editor", "Approver"])
  });
  static usersOrgSchema = z.array(OrganizationDto.userOrg).optional();

  static SaveOrgDto = z.object({
    id: z.number().optional(),
    name: z.string().min(5).optional(),
    createdAt: z.string().optional(),
    logo: z.string().optional(),
    users: OrganizationDto.usersOrgSchema,
  });

}
export type SaveUsersInOrganizationDTO = z.infer<typeof OrganizationDto.usersOrgSchema>
export type SaveOrgDTO = z.infer<typeof OrganizationDto.SaveOrgDto>
export type UserOrgDTO = z.infer<typeof OrganizationDto.userOrg>