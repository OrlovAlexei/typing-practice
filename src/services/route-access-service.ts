import { Admin } from "../entities/admin";
import { Moderator } from "../entities/moderator";
import { Page } from "../entities/page";
import type { RouteToUserType } from "../entities/route-to-user";
import type { User } from "../entities/user";

export default class RouteAccessService {
  private readonly access:RouteToUserType = {
    [Page.DASHBOARD]: Admin.Or(Moderator).check,
  };

  private getPermittedUsersFor(targetPage: Page):RouteToUserType[Page]  {
    return this.access[targetPage]
  }

  hasAccessTo(targetPage: Page,user:User):boolean {
    try {
      this.getPermittedUsersFor(targetPage)(user)
      return true;
    } catch(e) {
      if (e instanceof TypeError) {
        return false;
      }
      throw e;
    }
  }

}