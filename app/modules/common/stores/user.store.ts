import { UserRole } from './../enums/user-role';
import { observable, action, computed } from 'mobx';
import { injectable } from '@servicetitan/react-ioc';

export interface AppUser {
    id?: number;
    login: string;
    password: string;
    role: UserRole;
}

@injectable()
export class AppUserStore {
    constructor() {
        const user = window.localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
        }
    }

    @observable user: AppUser | undefined;

    @action
    gotAuthenticated = (user: AppUser): void => {
        window.localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
    };

    @action
    logout = (): void => {
        window.localStorage.removeItem('user');
        this.user = undefined;
    };

    @computed
    get authenticated() {
        return !!this.user;
    }
}
