import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AppTokenPayload } from "./request";
import { UserService } from "@/domain/services/user-service";
import { OrganizationService } from "@/domain/services/organization-service";

export interface FastifyInstanceZod extends FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
> { }
declare module 'fastify' {
  export interface FastifyRequest {
    tokenPayload?: AppTokenPayload
  }
  interface FastifyInstance {
    userService : UserService
    organizationService : OrganizationService
  }
}