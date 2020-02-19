import React from 'react';
import { Route, Switch } from 'react-router';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export const AuthModule = () => {
    return (
        <Switch>
            <Route path="/auth/register" component={RegisterForm} />
            <Route path="/auth/login" component={LoginForm} />
        </Switch>
    );
};
