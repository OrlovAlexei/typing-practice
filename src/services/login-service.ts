import { Email } from "../entities/email";
import { Password } from "../entities/password";
import { User } from "../entities/user";
import UserService from "./user-service";
import * as t from "runtypes"

const UserLoginInput = t.Record({
  email:Email,
  password: Password
})

type UserLoginInput = t.Static<typeof UserLoginInput>

export default class LoginService {

  constructor(private userService: UserService) {}

  public validateUserCredentials(email: string, password: string):UserLoginInput {
    try{
      const validEmail = Email.check(email)
      const validPassword = Password.check(password)

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
  public async login(email: Email, password: Password ): Promise<User> {
    const maybeUser = await this.userService.getUserByCred(email,password)

    if(!maybeUser){
      throw new Error(`User by credentials: email: ${email} password: ${password} not found`)
    }

    return maybeUser
  }
}
