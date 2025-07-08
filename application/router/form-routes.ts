import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { FlowDTO } from "../http/dto/flow-dto";

export function formRouter(app: FastifyInstanceZod) {
  app.register((instance, _, done) => {
    instance.withTypeProvider<ZodTypeProvider>()
      .get(
        "organization-forms",
        {
          schema: {
            querystring: z.object({ organizationId: z.string().min(1) })
          }
        },
        async (req, reply) => {

        }
      );
    instance.withTypeProvider<ZodTypeProvider>()
      .post(
        "save-form-organiztaion",
        {
          schema : {
            body : FlowDTO.form
          }
        },
        async (req, reply) => {
          
        }
      )
    done();
  });
}