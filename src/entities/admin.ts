import { Role } from "./role";
import { AccountInfo } from "./account-info";
import * as t  from "runtypes"


export const Admin = t.Record({
  ...AccountInfo.fields,
  role:t.Literal(Role.ADMIN),
}).asReadonly().withBrand("Admin")

export type Admin = t.Static<typeof Admin>

// export class Admin extends AccountInfo {
//   static of(user: User): Admin {
//     if (user instanceof Admin) {
//       return user;
//     }
//     throw new TypeError("User is not admin!");
//   }

//   static from(obj: object): Admin {
//     if (AccountInfo.is(obj)) {
//       return new Admin(
//         obj.id,
//         obj.name,
//         obj.email,
//         obj.password,
//       );
//     }
//     throw new TypeError("Object is not Admin");
//   }

//   private readonly _type = Symbol("Admin");
//   public readonly role = Role.ADMIN;

//   protected constructor(
//     id: string,
//     name: string,
//     email: string,
//     password: string
//   ) {
//     super(id, name, email, password);
//   }
// }
