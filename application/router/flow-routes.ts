import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { FlowDTO } from "../http/dto/flow-dto";

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
            const data = await router.flowService.getOrganizationFlows(req.query, type);
            return reply.status(200).send({ data, statusCode: 200 })
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
  }, { prefix: "/flow" })
}