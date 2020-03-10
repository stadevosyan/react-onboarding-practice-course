// import { GridRow } from './../stores/users.store';
import { AppUser } from './../../common/stores/user.store';
import { handleResponse } from './../../common/api/mocks/axios-response';
import { UserDB } from './../../common/api/mocks/users.db';
import { AxiosResponse } from 'axios';
import { injectable, inject } from '@servicetitan/react-ioc';

@injectable()
export class UsersApi {
    constructor(@inject(UserDB) private userDB: UserDB) {}

    getUsers = (): Promise<AxiosResponse<AppUser[]>> => {
        const users = this.userDB.getUsers();

        return handleResponse(users);
    };

    updateUser = (id: number, user: AppUser): Promise<AxiosResponse<AppUser | undefined>> => {
        const updatedUser = this.userDB.updateUser(id, user);

        return handleResponse(updatedUser);
    };

    removeUser = (id: number): Promise<AxiosResponse<AppUser | undefined>> => {
        const removedUser = this.userDB.removeUser(id);

        return handleResponse(removedUser);
    };
}
