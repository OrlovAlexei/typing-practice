import { Admin } from "../entities/admin";
import { Moderator } from "../entities/moderator";
import { Page } from "../entities/page";
import type { RouteToUserType } from "../entities/route-to-user";
import type { User } from "../entities/user";
import or from "../utils/or";

export default class RouteAccessService {
  private readonly access:RouteToUserType = {
    [Page.DASHBOARD]: or(Admin , Moderator),
  };

  private getPermittedUsersFor(targetPage: Page):RouteToUserType[Page]  {
    return this.access[targetPage]
  }

  hasAccessTo(targetPage: Page,user:User):boolean {
    try {
      return Boolean(this.getPermittedUsersFor(targetPage)(user))
    }catch(e) {
      return false
    }
  }

}