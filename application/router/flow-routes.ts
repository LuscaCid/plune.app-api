import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FlowDTO } from "../http/dto/flow-dto";
import { z } from "zod";

export type FlowType = "template" | "instance";

export function flowRouter(app: FastifyInstanceZod) {
  const flowTags = ['Flow']
  app.register((instance, options, done) => {

    const setupFlowRoutes = (router: FastifyInstanceZod, type: FlowType) => {
      router.withTypeProvider<ZodTypeProvider>()
        .get(
          "/",
          {
            schema: {
              querystring: FlowDTO.getFlowDTO,
              tags: flowTags,
              summary: "Returns all flows from a organization"
            }
          },
          async (req, reply) => {
            const response = await router.flowService.getOrganizationFlows(req.query, type);
            return reply.status(200).send({ data: response.data, count: response.count, statusCode: 200 })
          }
        );
      router.withTypeProvider<ZodTypeProvider>()
        .post(
          "/",
          {
            schema: {
              body: FlowDTO.saveFlowDTO,
              tags: flowTags,
              summary: "Adds a new flow into a organization"
            }
          },
          async (req, reply) => {
            const flowAdded = await router.flowService.save(req.body, req.tokenPayload?.user!);
            return reply.status(201).send({ data: flowAdded, message: "New flow added", statusCode: 201 });
          }
        )
      router.withTypeProvider<ZodTypeProvider>()
        .put(
          "/",
          {
            schema: {
              body: FlowDTO.saveFlowDTO,
              tags: flowTags,
              summary: "Updates a flow"
            }
          },
          async (req, reply) => {
            const flowUpdated = await router.flowService.update(req.body, req.tokenPayload!.user!);
            return reply.status(200).send({ data: flowUpdated, statusCode: 200, message: "Flow updated with success" });
          }
        )
      router.withTypeProvider<ZodTypeProvider>()
        .delete(
          "/:id",
          {
            schema: {
              tags: flowTags,
              params: z.object({ id: z.preprocess((val) => Number(val), z.number().min(1)) })
            }
          },
          async (req, reply) => {
            const deleted = await router.flowService.delete(req.params.id);
            return reply.status(200).send({ data: deleted, message: `Flow ${type} deleted with success`, statusCode: 200 })
          }
        )
      router.withTypeProvider<ZodTypeProvider>()
        .put(
          "/restore",
          {
            schema: {
              tags: flowTags,
              params: z.object({ id: z.preprocess((val) => Number(val), z.number().min(1)) })
            }
          },
          async (req, reply) => {
            const restored = await router.flowService.restore(req.params.id);
            return reply.status(200).send({ data : restored, statusCode :200, message: `Flow ${type} restored`})
          }
        )
    }
    instance.register((router, _, next) => {
      setupFlowRoutes(router, "instance");
      next()
    }, { prefix: "/instance" });

    instance.register((router, _, next) => {
      setupFlowRoutes(router, "template");
      next()
    }, { prefix: "/template" });
    done();
  }, { prefix: "/flows" })
}