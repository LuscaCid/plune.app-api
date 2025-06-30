import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OrganizationDto } from "../http/dto/organization-dto";
import { ForbiddenError } from "@casl/ability";
import { Actions, CaslFactory } from "../http/security/casl-factory";
import { Organization } from "@/domain/models/oraganization";

export function organizationRouter(app: FastifyInstanceZod) {
  const orgTags = ["Organization"];
  app.register((instance, options, done) => {
    instance.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          tags: orgTags
        }
      },
      async (req, reply) => {
        const data = await instance.organizationService.getUserOrganizations(req.tokenPayload!.user.id!);
        return reply.status(200).send({ data, statusCode: 200 })
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
        return reply.status(201).send({ data: orgSaved, message: "Organization saved with success", statusCode: 200 })
      }
    )
    instance.withTypeProvider<ZodTypeProvider>().put(
      "/",
      {
        preHandler: (req, reply, done) => {
          // const ability = CaslFactory.defineAbilityForUser(req.tokenPayload?.user);
          // ForbiddenError.from(ability).throwUnlessCan(Actions.Update, Organization)

          done();
        },
        schema: {
          body: OrganizationDto.SaveOrgDto,
          tags: orgTags,
        }
      },
      async (req, reply) => {
        const orgSaved = await instance.organizationService.save(req.body);
        return reply.status(201).send({ data: orgSaved, message: "Organization saved with success", statusCode: 200 })
      }
    )
    instance.withTypeProvider<ZodTypeProvider>()
      .post(
        "add-user-in-organization",
        {
          schema : {
            body : OrganizationDto.SaveOrgDto
          }
        },
        async (req, reply) => {
          const data = await instance.organizationService.saveUsersInOrganization(req.body);
          return reply.status(200).send({data, message: "Users updated.", statusCode : 200})
        }
      )
    done();
  }, { prefix: "organizations" });
}