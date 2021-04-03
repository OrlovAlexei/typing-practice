import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LogedInActionType, LogedInUser } from "../providers/loged-in-user";
import type { User } from "../entities/user";
import { Page } from "../entities/page";

export type Credentials = {
  email: string;
  password: string;
};

export default function useLogin(credentials: Credentials | null): User | null {
  const { loginService,routeAccessService} = useContext(Services);
  const { dispatch, state = { user: null } } = useContext(LogedInUser);

  useEffect(() => {
    if (!credentials || !dispatch) {
      return;
    }

    const {email,password} = loginService.validateUserCredentials(credentials.email, credentials.password)

    loginService.login(email, password)
      .then((user: User) => {
        dispatch!({ type: LogedInActionType.LOG_IN, payload: user })
        return user
      })
      .then(user=> {
        if(routeAccessService.hasAccessTo(Page.DASHBOARD,user)){
          navigate("/")
          return
        }
        navigate("/notfound")
      })
      .catch(e => alert(e.message));
  }, [credentials, dispatch]);

  return state.user;
}
