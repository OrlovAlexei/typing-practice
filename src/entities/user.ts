import  { Admin } from "./admin";
import  { Client } from "./client";
import  { Moderator } from "./moderator";
import * as t  from "runtypes"


export const User = t.Union(Admin, Client, Moderator)

export type User = t.Static<typeof User>


// export type User = Admin | Client | Moderator;


