import { z } from "zod";

export class DefaultSchema {
  static defaultReturn = z.object({
    message : z.string(),
    data: z.object({}),
    statusCode : z.number()
  })
}