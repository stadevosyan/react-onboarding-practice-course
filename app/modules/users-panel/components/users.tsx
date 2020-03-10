import React from 'react';
import { MainLayout } from '../../common/components/layouts/main-layout';
import { observer } from 'mobx-react';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { UsersApi } from '../api/users.api';
import { UsersStore } from '../stores/users.store';
import {
    Grid as KendoGrid,
    GridColumn,
    getSelectEditableCell,
    TextEditableCell,
    singleItemMultiSelectColumnMenuFilter,
    StandardColumnMenuFilter
} from '@servicetitan/grid';
import { ConfirmNavigation } from '@servicetitan/confirm-navigation';
import { enumToOptions, getEnumKeys } from '@servicetitan/form';
import { UserRole } from '../../common/enums/user-role';
import { ActionCell } from './actions-cell';

export const ActiveColumnMenuFilter = singleItemMultiSelectColumnMenuFilter([true, false], value =>
    value ? 'Active' : 'Inactive'
);

const UserRoleCell = getSelectEditableCell({ options: enumToOptions(UserRole) });

export const Users: React.FC = provide({
    singletons: [UsersApi, UsersStore]
})(
    observer(() => {
        const [{ gridState, inEdit }] = useDependencies(UsersStore);

        return (
            <MainLayout>
                <KendoGrid gridState={gridState} groupable>
                    <GridColumn title="id" field="id" editable={false} />
                    <GridColumn
                        title="login"
                        columnMenu={StandardColumnMenuFilter}
                        filter="text"
                        filterable
                        field="login"
                        cell={TextEditableCell}
                    />
                    <GridColumn title="password" field="password" cell={TextEditableCell} />
                    <GridColumn
                        title="role"
                        filterable
                        field="role"
                        cell={UserRoleCell}
                        columnMenu={singleItemMultiSelectColumnMenuFilter(getEnumKeys(UserRole))}
                    />
                    <GridColumn width={160} sortable={false} cell={ActionCell} />
                </KendoGrid>
                <ConfirmNavigation when={inEdit} />
            </MainLayout>
        );
    })
);
