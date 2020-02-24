import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import { AuthModule } from './modules/auth/components/auth-module';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { AppUserStore } from './modules/common/stores/user.store';
import { Users } from './modules/users/components/users-page';
import { observer } from 'mobx-react';

export const App: React.FC = provide({
    singletons: [AppUserStore]
})(
    observer(() => {
        const [userStore] = useDependencies(AppUserStore);
        const { authenticated } = userStore;

        return (
            <React.StrictMode>
                <HashRouter>
                    {authenticated ? (
                        <>
                            <Route path="/dashboard" component={Users} />
                            <Redirect to={'/dashboard'} />
                        </>
                    ) : (
                        <>
                            <Route path="/auth" component={AuthModule} />
                            <Redirect to={'/auth'} />
                        </>
                    )}
                </HashRouter>
            </React.StrictMode>
        );
    })
);
