import fastify from "fastify";
import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { Db } from "mongodb";
import { AppTokenPayload } from "./request";

export interface FastifyInstanceZod extends FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
> { }
declare module 'fastify' {
  export interface FastifyRequest {
    user?: AppTokenPayload
    conn?: Db,
  }
  interface FastifyInstance {
  }
}