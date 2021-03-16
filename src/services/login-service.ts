import { Email } from "../entities/email";
import { Password } from "../entities/password";
import { User } from "../entities/user";
import UserService from "./user-service";

type UserLoginInput = {
  email:Email,
  password:Password
}

export default class LoginService {

  constructor(private userService: UserService) {}

  public validateUserCredentials(email: string, password: string):UserLoginInput {
    try{
      const validEmail = Email.from(email)
      const validPassword = Password.from(password)

      return {
        email:validEmail,
        password:validPassword
      }

    }
    catch(e){
      throw e
    }
  }

  // Try to define better types
  public async login(email: UserLoginInput["email"], password: UserLoginInput["password"] ): Promise<User> {
    const maybeUser = await this.userService.getUserByCred(email,password)

    if(!maybeUser){
      throw new Error(`User by credentials: email: ${email} password: ${password} not found`)
    }

    return maybeUser
  }
}
