import { Admin } from "./admin"
import { Moderator } from "./moderator"

const RouteToUser = {
  dashboard: [Admin , Moderator]
}

export type RouteToUserType = typeof RouteToUser