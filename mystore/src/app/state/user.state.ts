import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { SetUser, ClearUser, Logout } from './user.state.action';

export interface UserStateModel {
    user: User | null;
    loggedIn: boolean;
}

@State<UserStateModel>({
    name: 'user',   
    defaults: {
        user: null,
        loggedIn: false, 
    },
})

@Injectable()

export class UserState {

    @Action(SetUser)
    setUser(ctx: StateContext<UserStateModel>, action: SetUser) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            user: action.payload,
            loggedIn: true,
        });
    }

    @Action(ClearUser)
    clearUser(ctx: StateContext<UserStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            user: null,
            loggedIn: false,
        });
    }
    @Action(Logout)
    logout(ctx: StateContext<UserStateModel>) {
        ctx.setState({
            user: null,
            loggedIn: false,
        });
    }

}