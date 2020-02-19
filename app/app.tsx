import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { AuthModule } from './modules/auth/components/auth-module';

export const App: React.FC = () => (
    <React.StrictMode>
        <HashRouter>
            <Switch>
                <Route path="/auth" component={AuthModule} />
            </Switch>
        </HashRouter>
    </React.StrictMode>
);
