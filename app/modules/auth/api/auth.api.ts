import { AppUser } from './../../common/stores/user.store';
import { handleResponse } from './../../common/api/mocks/axios-response';
import { UserDB } from './../../common/api/mocks/users.db';
import { AxiosResponse } from 'axios';
import { injectable, inject } from '@servicetitan/react-ioc';
import { action } from 'mobx';

interface UserCreds {
    login: string;
    password: string;
}

@injectable()
export class AuthApi {
    constructor(@inject(UserDB) private userDB: UserDB) {}

    @action
    login = (user: UserCreds): Promise<AxiosResponse> => {
        const loginUser = this.userDB.findUser(user);

        return handleResponse(loginUser);
    };

    @action
    register = (user: AppUser): Promise<AxiosResponse> => {
        const registerUser = this.userDB.addUser(user);

        return handleResponse(registerUser);
    };
}
