import React from 'react';
import { Form, Link, Stack } from '@servicetitan/design-system';
import { AuthLayout } from './layouts/auth-layout';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { observer } from 'mobx-react';
import { LoginStore } from '../stores/login.store';

export const LoginForm = provide({
    singletons: [LoginStore]
})(
    observer(() => {
        const [store] = useDependencies(LoginStore);
        const loginForm = store.formState.$;

        return (
            <AuthLayout header="Login">
                <Form>
                    <Form.Input
                        label="Login"
                        value={loginForm.login.value}
                        onChange={loginForm.login.onChangeHandler}
                    />
                    <Form.Input type="password" label="Password" />
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
