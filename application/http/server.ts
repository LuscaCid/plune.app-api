import "dotenv/config";
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { ForbiddenError } from "@casl/ability";
import rateLimit from "@fastify/rate-limit";
import { Logger } from "../../domain/config/logger";
import { AppError } from "../../infra/utils/AppError";
import { userPlugin } from "./plugin/user-plugin";
import { Router } from "../router/index-routes";
import { organizationPlugin } from "./plugin/organization-plugin";
import { flowPlugin } from "./plugin/flow-plugin";
import { connectionPlugin } from "./plugin/connection-plugin";

const port = process.env["PORT"] || 3000;

const app = fastify({
  maxRequestsPerSocket: 100,
}).withTypeProvider<ZodTypeProvider>();

app.register(rateLimit, {
  max: 50,
  timeWindow: "4000"
});
app.register(fastifyCors, { origin: "*" });

app.register(connectionPlugin);
app.register(userPlugin);
app.register(organizationPlugin);
app.register(flowPlugin);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(fastifySwagger, {
  transform: jsonSchemaTransform,
  openapi: {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      }
    },
    security: [{ bearerAuth: [] }],
    info: {
      version: "1.0.0",
      title: "Plune.app-api"
    },
  }
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});


app.register(Router, { prefix: "/v1" });

app.setErrorHandler((error, request, reply) => {
  console.log(error);
  if (error instanceof AppError) {
    Logger.error(error.message, 'AppError');
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
      code: error.code || 'APP_ERROR'
    });
  }

  if (error instanceof ForbiddenError) {
    Logger.error(error.message, 'ForbiddenError');
    return reply.status(403).send({
      statusCode: 403,
      message: error.message,
      validation: error.validation
    });
  }

  if (error.code === "FST_ERR_VALIDATION") {
    Logger.warn(error.message, 'ValidationError');
    return reply.status(400).send({
      statusCode: 400,
      message: error.message,
      validation: error.validation
    });
  }

  request.log.error(error);
  return reply.status(500).send({
    statusCode: 500,
    message: "Internal server error",
    code: "INTERNAL_ERROR"
  });
});

app.listen({ port: Number(port), host: "0.0.0.0" })
  .then(async () => {
    // connectDatabase();
    console.log(`🚀 Server is listening on port ${port}`);
  });
