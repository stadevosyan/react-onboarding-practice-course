import { FormState, FieldState } from 'formstate';
import { UsersApi } from './../api/users.api';
import { injectable, inject } from '@servicetitan/react-ioc';
import { GridState, InMemoryDataSource } from '@servicetitan/grid';
import { setFormStateValues } from '@servicetitan/form';
import { UserRole } from '../../common/enums/user-role';

export interface GridDataItem {
    id: number;
    login: string;
    password?: string;
    role: UserRole;
}

@injectable()
export class UsersStore {
    constructor(@inject(UsersApi) private usersApi: UsersApi) {
        this.getUsers();
    }

    private getFormState = (user: GridDataItem) => {
        return setFormStateValues(
            new FormState({
                id: new FieldState(user.id),
                login: new FieldState(user.login),
                password: new FieldState(user.password),
                role: new FieldState(user.role)
            }),
            user
        );
    };

    gridState = new GridState<GridDataItem, number>({
        pageSize: 10,
        getFormState: this.getFormState
    });

    get inEdit() {
        return this.gridState.inEdit.size > 0;
    }

    getUsers = async () => {
        const result = await this.usersApi.getUsers();
        const { data } = result;

        const gridData = data.map(user => ({
            id: user.id!,
            role: user.role,
            login: user.login,
            password: ''
        }));

        if (gridData) {
            await this.gridState.setDataSource(
                new InMemoryDataSource<GridDataItem, number>(gridData, user => user.id!)
            );
        }
    };

    updateUser = async (user: GridDataItem): Promise<void> => {
        await this.gridState.saveEdit(user, async changed => {
            if (changed.password === '') {
                delete changed.password;
            }
            await this.usersApi.updateUser(user.id, changed);
        });
    };

    removeUser = async (id: number): Promise<GridDataItem | undefined> => {
        const { data: user } = await this.usersApi.removeUser(id);
        if (!user) {
            return;
        }

        this.gridState.removeFromDataSource(id);
    };
}
