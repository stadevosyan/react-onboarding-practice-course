import { FormState, FieldState } from 'formstate';
import { UsersApi } from './../api/users.api';
import { injectable, inject } from '@servicetitan/react-ioc';
import { GridState, AsyncDataSource, ProcessedData } from '@servicetitan/grid';
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
    constructor(@inject(UsersApi) private usersApi: UsersApi) {}

    private get dataSource() {
        return new AsyncDataSource(
            {
                get: this.getUsers,
                update: this.updateUser,
                remove: this.removeUser
            },
            this.idSelector
        );
    }

    get inEdit() {
        return this.gridState.inEdit.size > 0;
    }

    private idSelector(user: GridDataItem) {
        return user.id;
    }

    getUsers = async (): Promise<ProcessedData<GridDataItem>> => {
        const result = await this.usersApi.getUsers();
        const { data } = result;

        const gridData = data.map(user => ({
            id: user.id!,
            role: user.role,
            login: user.login,
            password: ''
        }));
        return {
            data: gridData,
            filteredCount: gridData.length
        };
    };

    updateUser = async (id: number, user: GridDataItem): Promise<void> => {
        await this.usersApi.updateUser(id, user);
    };

    removeUser = async (id: number): Promise<GridDataItem | undefined> => {
        const { data: user } = await this.usersApi.removeUser(id);
        if (!user) {
            return undefined;
        }
        const gridUser: GridDataItem = {
            id: user.id!,
            login: user.login,
            role: user.role
        };
        return gridUser;
    };

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

    get gridState() {
        return new GridState({
            dataSource: this.dataSource,
            selectionLimit: 3,
            getFormState: this.getFormState,
            pageSize: 10
        });
    }
}
