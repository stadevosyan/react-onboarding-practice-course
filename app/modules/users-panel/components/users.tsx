import React from 'react';
import { MainLayout } from '../../common/components/layouts/main-layout';
import { observer } from 'mobx-react';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { UsersApi } from '../api/users.api';
import { UsersStore } from '../stores/users.store';

export const Users: React.FC = provide({
    singletons: [UsersApi, UsersStore]
})(
    observer(() => {
        const [{ users }] = useDependencies(UsersStore);

        console.log({ users });
        return (
            <MainLayout>
                <div>Users page</div>
            </MainLayout>
        );
    })
);
