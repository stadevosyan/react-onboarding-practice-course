import { UsersApi } from './../api/users.api';
import { AppUser } from './../../common/stores/user.store';
import { injectable, inject } from '@servicetitan/react-ioc';
import { observable, action } from 'mobx';

@injectable()
export class UsersStore {
    @observable
    users: AppUser[] = [];

    @observable
    loginError = '';

    constructor(@inject(UsersApi) private usersApi: UsersApi) {
        this.getUsers();
    }

    @action getUsers = async (pageNumber = 1) => {
        const result = await this.usersApi.getUsers(pageNumber);

        if (result.status === 200) {
            this.setError('');
            this.setUsers(result.data);
        } else {
            this.setError('Something went wrong');
        }
    };

    @action
    private setUsers = (users: AppUser[]) => {
        this.users = users;
    };

    @action setError = (errMsg: string): void => {
        this.loginError = errMsg;
    };
}
