import { z } from "zod";

export class OrganizationDto {
  static SaveOrgDto = z.object({
    orgId : z.string().min(1).optional(),
    name : z.string().min(5),
    users : z.array(z.object({})).optional()
  })
}

export type SaveOrgDto = z.infer<typeof OrganizationDto.SaveOrgDto>