import { UserRole } from './../../enums/user-role';
import { AppUser } from './../../stores/user.store';
import { injectable } from '@servicetitan/react-ioc';

export const Users: AppUser[] = [
    {
        id: 1,
        login: 'test_login_1',
        password: 'HQ.z>mWH>EZ_e5@m',
        role: UserRole.Admin
    },
    {
        id: 2,
        login: 'test_login_2',
        password: '29YjbZYzp`p&9$S=',
        role: UserRole.Operator
    },
    {
        id: 3,
        login: 'test_login_3',
        password: '`V,x[=6CQ5jP4!v)',
        role: UserRole.Public
    },
    {
        id: 4,
        login: 'test_login_4',
        password: 'b)Cd!Yf:/hAW8!Q`',
        role: UserRole.Operator
    },
    {
        id: 5,
        login: 'test_login_5',
        password: 'q?2J(+_LS9rjvGYP',
        role: UserRole.Public
    }
];

@injectable()
export class UserDB {
    addUser = (user: AppUser): AppUser | undefined => {
        if (Users.find(item => item.login === user.login)) {
            return undefined;
        } else {
            const newId = Users.length ? Users.length + 1 : 1;
            const newUser = { ...user, id: newId };
            Users.push(newUser);

            return newUser;
        }
    };

    findUser = (user: { login: string; password: string }): AppUser | undefined =>
        Users.find(item => item.login === user.login && item.password === user.password);

    getUsers = (offset: number, limit: number) => {
        return Users.slice(offset, limit);
    };
}
