import { Admin } from "./admin";
import { Moderator } from "./moderator";
import { Page } from "./page";

export const RouteToUser = {
  [Page.DASHBOARD]: Admin.Or(Moderator).check,
};

export type RouteToUserType = typeof RouteToUser;
