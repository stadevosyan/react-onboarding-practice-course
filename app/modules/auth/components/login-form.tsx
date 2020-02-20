import React from 'react';
import { Form, Link, Stack } from '@servicetitan/design-system';
import { AuthLayout } from './layouts/auth-layout';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { observer } from 'mobx-react';
import { LoginStore } from '../stores/login.store';
import { Label } from '@servicetitan/form';

export const LoginForm = provide({
    singletons: [LoginStore]
})(
    observer(() => {
        const [store] = useDependencies(LoginStore);
        const loginForm = store.formState.$;
        const { login: loginField } = loginForm;
        const { password: passwordField } = loginForm;

        const { login: loginAction } = store;

        return (
            <AuthLayout header="Login">
                <Form onSubmit={loginAction}>
                    <Form.Input
                        label={
                            <Label
                                label="Login"
                                hasError={loginField.hasError}
                                error={loginField.error}
                            />
                        }
                        error={loginField.hasError}
                        value={loginField.value}
                        onChange={loginField.onChangeHandler}
                    />
                    <Form.Input
                        label={
                            <Label
                                label="Password"
                                hasError={passwordField.hasError}
                                error={passwordField.error}
                            />
                        }
                        value={passwordField.value}
                        onChange={passwordField.onChangeHandler}
                        error={passwordField.hasError}
                        type="password"
                    />
                    <Stack alignItems="center" justifyContent="space-between">
                        <Link href="#/auth/register" primary>
                            Sign Up
                        </Link>
                        <Form.Button type="submit" primary>
                            Login
                        </Form.Button>
                    </Stack>
                </Form>
            </AuthLayout>
        );
    })
);
