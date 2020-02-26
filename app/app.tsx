import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import { AuthModule } from './modules/auth/components/auth-module';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { AppUserStore } from './modules/common/stores/user.store';
import { Users } from './modules/users-panel/components/users';
import { observer } from 'mobx-react';
import { NewsFeed } from './modules/news-feed/components/news-feed';
import { UserDB } from './modules/common/api/mocks/users.db';

export const App: React.FC = provide({
    singletons: [AppUserStore, UserDB]
})(
    observer(() => {
        const [userStore] = useDependencies(AppUserStore);
        const { authenticated } = userStore;

        return (
            <React.StrictMode>
                <HashRouter>
                    {authenticated ? (
                        <>
                            <Route path="/users" component={Users} />
                            <Route path="/news-feed" component={NewsFeed} />
                            <Redirect to={'/users'} />
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
