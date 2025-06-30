import { Roles, User } from "@/@types/user";
import { z } from "zod";

export class OrganizationDto {
  static userOrg = z.object({
    id: z.string().min(2),
    role : z.enum(["Viewer", "Editor", "Approver", "Admin"])
  })
  static SaveOrgDto = z.object({
    orgId: z.string().min(1).optional(),
    name: z.string().min(5).optional(),
    users: z.array(OrganizationDto.userOrg).optional()
  })

}

export type SaveOrgDto = z.infer<typeof OrganizationDto.SaveOrgDto>