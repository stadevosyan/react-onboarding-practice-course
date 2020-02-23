import { UserRole } from './../enums/user-role';
import { observable, action } from 'mobx';
import { injectable } from '@servicetitan/react-ioc';

export interface AppUser {
    id?: number;
    login: string;
    password: string;
    role: UserRole;
}

@injectable()
export class AppUserStore {
    @observable user: AppUser | undefined;

    @action
    setAppUser = (user: AppUser): void => {
        this.user = user;
    };
}
