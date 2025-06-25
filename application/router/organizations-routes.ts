import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OrganizationDto } from "../http/dto/organization-dto";
import { ForbiddenError } from "@casl/ability";
import { CaslFactory } from "../http/security/casl-factory";

export function organizationRouter(app: FastifyInstanceZod) {
  const orgTags = ["Organization"];
  app.register((instance, options, done) => {
    instance.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          params: z.object({
            userId: z.string().min(1, "Its necessary to pass user id to see his organizations")
          }),
          tags: orgTags
        }
      },
      async (req, reply) => {
        return await instance.organizationService.getUserOrganizations(req.user!.id);
      }
    )
    instance.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          body: OrganizationDto.SaveOrgDto,
          tags: orgTags
        }
      },
      async (req, reply) => {
        const orgSaved = await instance.organizationService.save(req.body);
        return reply.status(201).send({ data : orgSaved, message : "Organization saved with success", statusCode: 200})
      }
    )
    instance.withTypeProvider<ZodTypeProvider>().put(
      "/",
      {
        preHandler : (req, reply, done) => {
          const ability = CaslFactory.defineAbilityForUser(req.user);
          ForbiddenError.from

          done();
        },
        schema: {
          body: OrganizationDto.SaveOrgDto,
          tags: orgTags,
        }
      },
      async (req, reply) => {
        const orgSaved = await instance.organizationService.save(req.body);
        return reply.status(201).send({ data : orgSaved, message : "Organization saved with success", statusCode: 200})
      }
    )
    done();
  }, { prefix : "organizations"});
}