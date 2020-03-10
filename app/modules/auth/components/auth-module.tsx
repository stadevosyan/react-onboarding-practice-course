import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { provide } from '@servicetitan/react-ioc';
import { observer } from 'mobx-react';
import { AuthApi } from '../api/auth.api';

export const AuthModule = provide({
    singletons: [AuthApi]
})(
    observer(() => {
        return (
            <Switch>
                <Route path="/auth/login" component={LoginForm} />
                <Route path="/auth/register" component={RegisterForm} />
                <Redirect to="/auth/register" />
            </Switch>
        );
    })
);
