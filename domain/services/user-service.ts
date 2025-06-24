import { UserRepository } from "../../infra/repositories/user-repostory";

export class UserService {
  constructor(private readonly userRepository : UserRepository) 
  {}

  signIn = () => {}
  signUp = () => {}
  update = () => {}
  delete = () => {}
}