import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { FastifyInstanceZod } from "../../../@types/fastify-instance-zod";
import { AppError } from "../../../infra/utils/AppError";
import { JwtSecurityService } from "../security/jwt-service";
import { AppTokenPayload } from "../../../@types/request";

export function authGuard(req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new AppError("Token não passado", 400)
  }
  try {
    const token = auth.split(" ")[1]
    req.user = JwtSecurityService.validateToken(token) as AppTokenPayload;
  } catch (err) {
    throw new AppError("Token inválido", 401)
  }
  done();

}