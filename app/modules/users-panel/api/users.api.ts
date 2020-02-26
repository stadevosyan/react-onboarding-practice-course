import { AppUser } from './../../common/stores/user.store';
import { mockAxiosResponse } from './../../common/api/mocks/axios-response';
import { UserDB } from './../../common/api/mocks/users.db';
import { AxiosResponse } from 'axios';
import { injectable, inject } from '@servicetitan/react-ioc';
import { action } from 'mobx';

@injectable()
export class UsersApi {
    usersPerPage = 3;

    constructor(@inject(UserDB) private userDB: UserDB) {}

    @action
    getUsers = (pageNumber: number): Promise<AxiosResponse> => {
        const offset = (pageNumber - 1) * this.usersPerPage;
        const users = this.userDB.getUsers(offset, this.usersPerPage);

        return this.handleResponse(users);
    };

    handleResponse = (users: AppUser[] | undefined) => {
        let status: number;
        if (users !== undefined) {
            status = 200;
        } else {
            status = 404;
        }

        return mockAxiosResponse(users, status);
    };
}
