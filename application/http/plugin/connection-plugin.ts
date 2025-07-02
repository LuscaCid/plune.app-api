import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { Logger } from "@/domain/config/logger";
import { dataSource } from "@/infra/database/datasource";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { TypeORMError } from "typeorm";

const registerConnection : FastifyPluginAsync = async (app : FastifyInstanceZod) => {
  try {
    const source = await dataSource.initialize();
    app.decorate("dataSource", source);
    Logger.info("Connected to the database");
  } catch (err) {
    if (err instanceof TypeORMError) {
      Logger.error(err.message);
    }
  }
}

export const connectionPlugin = fp(registerConnection); 