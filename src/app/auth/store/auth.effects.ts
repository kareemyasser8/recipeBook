import { Actions, ofType } from '@ngrx/effects/src';
import { switchMap } from 'rxjs/operators';
import * as AuthActions from '../store/auth.actions';

export class AuthEffects {
  authLogin = this.actions$.pipe(ofType(AuthActions.LOGIN_START));

  constructor(private actions$: Actions) {}
}
