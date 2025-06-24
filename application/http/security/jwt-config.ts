import { EnvVariables, ServerConfig } from "../../../domain/config/server-config";

export default { 
  expiresIn : "1d",
  secret : ServerConfig.getEnv(EnvVariables.jwtSecret)
}