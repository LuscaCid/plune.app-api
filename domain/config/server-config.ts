import "dotenv/config"
import { AppError } from "../../infra/utils/AppError"
import { DataSource } from "typeorm";
import { User } from "../entities-pg/user.entity";
import { UserOrganizationRole } from "../entities-pg/user-organization.entity";
import { Flow } from "../entities-pg/flow.entity";
import { Organization } from "../entities-pg/organization.entity";

export enum EnvVariables {
  port = "PORT",
  jwtSecret = "JWT_SECRET",
  dbUrl = "DB_URL",

}
export class ServerConfig {
  public static getEnv(env : EnvVariables) {
    const data = process.env[env]
    if (!data) {
      throw new AppError("Variável de ambiente não estabelecida", 500)
    }
    return data;
  }

  public static getDataSource () {
    return new DataSource({
      type: "postgres",
      url : this.getEnv(EnvVariables.dbUrl),
      synchronize: true,
      entities : [ User, UserOrganizationRole, Flow, Organization ]
    });
  }
}