// @ts-ignore
import jwt from "jsonwebtoken"
import { AppTokenPayload } from "../../../@types/request";

export class JwtSecurityService {
  static signInToken = (payload: AppTokenPayload) => {
    return jwt.sign(payload, process.env["JWT_SECRET"]!);
  }
  static validateToken = (token: string) => {
    return jwt.verify(token, process.env["JWT_SECRET"]!) as unknown as AppTokenPayload;
  }
}