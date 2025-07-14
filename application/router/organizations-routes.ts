import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OrganizationDto } from "../http/dto/organization-dto";
import { ForbiddenError } from "@casl/ability";
import { Actions, CaslFactory } from "../http/security/casl-factory";
import { AppError } from "@/infra/utils/AppError";

export function organizationRouter(app: FastifyInstanceZod) {
  const orgTags = ["Organization"];
  app.register((instance, options, done) => {
    instance.withTypeProvider<ZodTypeProvider>().get(
      "/organization-users",
      {
        schema: {
          querystring: z.object({ orgId: z.number().min(1).transform(val => Number(val)) }),
          tags: orgTags,
          summary: "Returns all users from a organization"
        }
      },
      async (req, reply) => {
        const usersFoundInOrganization = await instance.organizationService.getOrganizationUsers(req.query.orgId);
        return reply.status(200).send({ data: usersFoundInOrganization, statusCode: 200 });
      }
    )
    instance.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          tags: orgTags,
          // params: z.object({ userId: z.string().min(1) }),
          summary: "Returns all organizations correlated with the user passed in params"
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
          tags: orgTags,
          summary: "Adds a new organization"
        }
      },
      async (req, reply) => {
        const orgSaved = await instance.organizationService.save(req.body, req.tokenPayload!.user!);
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
          summary: "Updates an organization"
        }
      },
      async (req, reply) => {
        if (!req.body.id) {
          throw new AppError("For update an organization, the id is required")
        }
        const orgSaved = await instance.organizationService.save(req.body, req.tokenPayload!.user!);
        return reply.status(201).send({ data: orgSaved, message: "Organization saved with success", statusCode: 200 })
      }
    )
    instance.withTypeProvider<ZodTypeProvider>()
      .post(
        "/save-users-in-organization",
        {
          schema: {
            body: OrganizationDto.SaveOrgDto,
            tags: orgTags,
            summary: "Save (add, or update users roles) inside of an organization"
          }
        },
        async (req, reply) => {
          const data = await instance.organizationService.saveUsersInOrganization(req.body, req.tokenPayload!.user!);
          return reply.status(200).send({ data, message: "Users updated.", statusCode: 200 })
        }
      )
    instance.withTypeProvider<ZodTypeProvider>()
      .delete(
        "/:id",
        {
          schema: {
            tags: orgTags,
            params: z.object({
              id: z.preprocess((val) => Number(val), z.number().min(1)),
            })
          }
        },
        async (req, reply) => {
          const response = await instance.organizationService.delete(req.params.id);
          return reply.status(200).send({ message: "organization deleted with success", data: response, statusCode: 200 })
        }
      );
    instance.withTypeProvider<ZodTypeProvider>()
      .put(
        "/restore/:id",
        {
          schema: {
            tags: orgTags,
            params: z.object({
              id : z.preprocess(val => Number(val), z.number().min(1))
            }) 
          }
        },
        async (req, reply) => {
          const restored = await instance.organizationService.restore(req.params.id);
          return reply.status(200).send({data: restored, statusCode : 200, message: "Organization restored"})
        }
      )

    done();
  }, { prefix: "/organizations" });
}