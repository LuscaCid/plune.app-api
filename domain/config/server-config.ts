import "dotenv/config"
import { AppError } from "../../infra/utils/AppError"

export enum EnvVariables {
  port = "PORT",
  jwtSecret = "JWT_SECRET",

}
export class ServerConfig {
  public static getEnv(env : EnvVariables) {
    const data = process.env[EnvVariables[env]]
    if (!data) {
      throw new AppError("Variável de ambiente não estabelecida", 500)
    }
    return data;
  }
}