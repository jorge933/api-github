import { ROUTES } from "../constants/routes";
import { RoutesType } from "../models/types.model";

export class RouterService {
  getParams() {
    const hashedRoute = window.location.hash;
    const targetRoute = this.getTargetRoute(hashedRoute);
    const routeAndParams = targetRoute.split("/");
    return routeAndParams;
  }

  getPage() {
    const routeAndParams = this.getParams();
    const fragment = routeAndParams[0] as keyof RoutesType;
    return ROUTES[fragment]();
  }
  getTargetRoute(hash: string) {
    const hashIsEmpty = hash === "";
    return hashIsEmpty ? "search" : hash.replace("#", "");
  }
}
