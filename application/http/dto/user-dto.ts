import { z } from "zod";

export class UserDto {
  static signUp = z.object({
    password : z.string().min(6),
    name : z.string().min(2).max(30),
    email : z.string().email(),
    avatar : z.any().optional(),
  });

  static signIn = z.object({
    email : z.string().email(),
    password : z.string().min(6)
  });
  static update = z.object({
    name : z.string().min(2).max(30).optional(),
    email : z.string().email().optional(),
    avatar : z.any().optional(),
    currentPassword : z.string().min(6).optional(),
    newPassword : z.string().min(6).optional()
  })
}

export type SignInDto = z.infer<typeof UserDto.signIn>
export type SignUpDto = z.infer<typeof UserDto.signUp>
export type UpdateUserDto = z.infer<typeof UserDto.update>