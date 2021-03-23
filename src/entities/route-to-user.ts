import or from "../utils/or"
import { Admin } from "./admin"
import { Moderator } from "./moderator"
import { Page } from "./page"

const RouteToUser = {
  [Page.DASHBOARD]: or(Admin,Moderator)
}

export type RouteToUserType = typeof RouteToUser