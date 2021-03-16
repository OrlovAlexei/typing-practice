import { Role } from "../entities/role";
import { Admin } from "../entities/admin";
import { Client } from "../entities/client";
import { Moderator } from "../entities/moderator";
import type { User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";
import { Password } from "../entities/password";
import { Email } from "../entities/email";
import { UserRoleTransformations, UserRoleTransformationsType } from "../entities/user-role-transformations";

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => {
      const User = this.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  async getUserByCred(email:Email, password:Password):Promise<User |null>{

    await this.getAllUsers();

    const user = this.users.find(u => u.email===email && u.password === password)

    return user ?? null
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  getAvailableOperations<R1 extends Role, R2 extends Role>(user: User, currenUser: User): UserRoleTransformationsType[R2][R1]  {
    return UserRoleTransformations[currenUser.role][user.role];
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }
}
