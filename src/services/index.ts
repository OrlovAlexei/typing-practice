import UserService from "./user-service";
import OperationService from "./operation-service";
import { createContext } from "react";
import LoginService from "./login-service";
import RouteAccessService from "./route-access-service";

const userService = new UserService();
const loginService = new LoginService(userService);
const operationService = new OperationService(userService);

const routeAccessService = new RouteAccessService()

const Services = createContext({
  userService,
  loginService,
  operationService,
  routeAccessService
});

export default Services;
