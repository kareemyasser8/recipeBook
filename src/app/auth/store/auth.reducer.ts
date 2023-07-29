import { User } from '../user.model';
import * as AuthActions from '../store/auth.actions';

export interface State {
  user: User;
}

export const intitialState: State = {
  user: null,
};

export function authReducer(
  state = intitialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
