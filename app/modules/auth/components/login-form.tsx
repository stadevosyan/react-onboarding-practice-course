import React from 'react';
import { Form, Link, Stack } from '@servicetitan/design-system';
import { AuthLayout } from './layouts/auth-layout';

export const LoginForm = () => {
    return (
        <AuthLayout header="Login">
            <Form>
                <Form.Input label="Login" />
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
};
