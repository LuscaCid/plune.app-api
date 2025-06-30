import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstanceZod } from "../../@types/fastify-instance-zod";
import { z } from "zod";
import { DefaultSchema } from "../http/dto/routes-default";

export function nodesRouter(app: FastifyInstanceZod) {
  const tags = ['nodes']
  app.register((instance, options, done) => {
    instance.withTypeProvider<ZodTypeProvider>()
      .get(
        "instance-nodes",
        {
          schema: {
            querystring: z.object({

            }),
            tags: tags,
            response: {
              200: DefaultSchema.defaultReturn
            }
          }
        },
        async (req, reply) => {
          return reply.status(200).send({ message: "teste", data: { oi: "aa" }, statusCode: 200 })
        }
      )
    done()
  }, { prefix: '/nodes' })
  return
}