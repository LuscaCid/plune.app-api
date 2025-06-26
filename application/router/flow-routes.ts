import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function flowRouter(app: FastifyInstanceZod) {
  app.register((instance, options, done) => {
    instance.register((router, opt, next) => {

    }, { prefix: "/instance" });

    instance.register((router, opt, next) => {
      router.withTypeProvider<ZodTypeProvider>()
        .get(
          "/flows",
          {
            schema: {
              params: z.object({
                organizationId: z.string().min(1)
              })
            }
          },
          async (req, reply) => {
            const data = await router.flowInstanceService.getOrganizationFlows(req.params.organizationId);
            return reply.status(200).send({ data, statusCode: 200 })
          }
        )
    }, { prefix: "/instance" })

    // instance.withTypeProvider<ZodTypeProvider>()
    // .get(
    //   "/organization-flows"
    // )
    done();
  }, { prefix: "/flow" })
}