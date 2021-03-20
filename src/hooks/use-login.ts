import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LogedInActionType, LogedInUser } from "../providers/loged-in-user";
import type { User } from "../entities/user";

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
    loginService.login(credentials.email, credentials.password)
      .then((user: User) => {
        dispatch!({ type: LogedInActionType.LOG_IN, payload: user })
        return user
      })
      .then(user=> {
        if(routeAccessService.hasAccessTo("dashboard",user)){
          navigate("/")
          return
        }
        navigate("/notfound")
      })
      .catch(e => alert(e.message));
  }, [credentials, dispatch]);

  return state.user;
}
