import { UserStateModel } from './user.state';
import { User } from '../model/user.model';
import { Selector } from '@ngxs/store';
import { isTokenValid } from '../shared/auth.utils';


export class UserSelectors {

  @Selector()
  static getUser(state: UserStateModel): User | null {
      return state.user;
  }

  @Selector()
  static clearUser(state: UserStateModel): User | null {
      return null;
    }

    @Selector()
    static getToken(state: UserStateModel): string | null {
      return state.user?.accessToken || null;
    }

    @Selector()
    static getRefreshToken(state: UserStateModel): string | null {
      return state.user?.refreshToken || null;
    }

    @Selector()
    static isLoggedIn(state?: UserStateModel): boolean {
      return state && state.loggedIn ? true : false;
    }
   
}

