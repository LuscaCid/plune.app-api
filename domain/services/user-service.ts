import { AppTokenPayload } from "@/@types/request";
import { User } from "@/@types/user";
import { SignInDto, SignUpDto } from "@/application/http/dto/user-dto";
import { JwtSecurityService } from "@/application/http/security/jwt-service";
import { UserRepository } from "@/infra/repositories/user-repostory";
import { AppError } from "@/infra/utils/AppError";
import { compare, hash } from "bcryptjs";
export class UserService {
  static INVALID_CREDENTIALS = "Invalid credentials"
  constructor(private readonly userRepository : UserRepository) 
  {}

  signIn = async (payload : SignInDto) => {
    const user = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new AppError(UserService.INVALID_CREDENTIALS, 401);
    }
    const isPasswordCorrect = await compare(payload.password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError(UserService.INVALID_CREDENTIALS, 401)
    }

    await this.userRepository.updateLastAccess(user.id);
    return {
      token : JwtSecurityService.signInToken({ id : user.id, organizationRoles : user.organizationsRoles } as AppTokenPayload),
      userCommonData : { name : user.name, email : user.email }
    }
  }
  
  signUp = async (newUser : SignUpDto) => {
    const userAlreadyExists = await this.userRepository.findByEmail(newUser.email);
    if (userAlreadyExists) {
      throw new AppError("User with this e-mail already exists", 401);
    }
    newUser.password = await hash(newUser.password, 8);

    return await this.userRepository.create(newUser);
  }

  update = () => {

  }
  delete = () => {

  }
}