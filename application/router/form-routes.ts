import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { FlowDTO } from "../http/dto/flow-dto";

export function formRouter(app: FastifyInstanceZod) {
  const formTags = ['Organization Forms']
  app.register((instance, _, done) => {
    instance.withTypeProvider<ZodTypeProvider>()
      .get(
        "/:id",
        {
          schema: {
            tags: formTags,
            params: z.object({ id: z.preprocess((val) => Number(val), z.number().min(1)) })
          }
        },
        async (req, reply) => {
          const forms = await instance.formService.getOrganizationForms(req.params.id);
          return reply.status(200).send({ data: forms, statusCode: 200 })
        }
      );
    instance.withTypeProvider<ZodTypeProvider>()
      .post(
        "/",
        {
          schema: {
            tags: formTags,
            body: FlowDTO.form
          }
        },
        async (req, reply) => {
          const formSaved = await instance.formService.saveOrganizationForm(req.body, req.tokenPayload!.user!);
          return reply.status(req.body.id ? 200 : 201).send({ data: formSaved, satusCode: 200, message: "Form created." })
        }
      )
    instance.withTypeProvider<ZodTypeProvider>()
      .put(
        "/",
        {
          schema: {
            tags: formTags,
            body: FlowDTO.form
          }
        },
        async (req, reply) => {
          const formSaved = await instance.formService.saveOrganizationForm(req.body, req.tokenPayload!.user!);
          return reply.status(200).send({ data: formSaved, satusCode: 200, message: "Form updated." })
        }
      )
    done();
  }, { prefix: "/forms" });
}