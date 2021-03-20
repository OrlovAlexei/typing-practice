import { Admin } from "../entities/admin";
import { Moderator } from "../entities/moderator";
import { RouteToUserType } from "../entities/route-to-user";
import type { User } from "../entities/user";

export default class RouteAccessService {
  private readonly access:RouteToUserType = {
    dashboard: [Admin , Moderator],
  };

  // @JSMonk как сделать чтобы он отдавал при ключе dashboard => Admin | Moderator
  hasAccessTo<TargetPage extends keyof RouteToUserType>(targetPage: TargetPage,user: User): boolean {
    return this.access[targetPage].some(inst => user instanceof inst)
  }

}



