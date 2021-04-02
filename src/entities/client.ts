import { Role } from "./role";
import { AccountInfo } from "./account-info";
import * as t  from "runtypes"


export const Client = t.Record({
  ...AccountInfo.fields,
  role:t.Literal(Role.CLIENT)
}).asReadonly().withBrand("Client")

export type Client = t.Static<typeof Client>


// export class Client extends AccountInfo {
//   static of(user: User): Client {
//     if (user instanceof Client) {
//       return user;
//     }
//     throw new TypeError("User is not client!");
//   }

//   static from(obj: object): Client {
//     if (AccountInfo.is(obj)) {
//       return new Client(
//         obj.id,
//         obj.name,
//         obj.email,
//         obj.password,
//       );
//     }
//     throw new TypeError("Object is not Admin");
//   }

//   private readonly _type = Symbol("Client");
//   public readonly role = Role.CLIENT;

//   protected constructor(
//     id: string,
//     name: string,
//     email: string,
//     password: string
//   ) {
//     super(id, name, email, password);
//   }
// }
