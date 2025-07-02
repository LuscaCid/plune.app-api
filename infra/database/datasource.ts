import { Logger } from "@/domain/config/logger";
import { ServerConfig } from "@/domain/config/server-config";
import { TypeORMError } from "typeorm";

export const dataSource = ServerConfig.getDataSource();

export async function connect() {
  try {
    dataSource.initialize();
    Logger.info("Connected to the database")
  } catch (err) {
    if (err instanceof TypeORMError) {
      Logger.error(err)
    }
  }
}
