import React from 'react';
import { Form, Link, Stack } from '@servicetitan/design-system';
import { AuthLayout } from './layouts/auth-layout';
import { UserRole } from '../../common/enums/user-role';
import { enumToOptions } from '@servicetitan/form';

export const RegisterForm = () => {
    const userRoleOptions = enumToOptions(UserRole);

    return (
        <AuthLayout header="Register">
            <Form>
                <Form.Input label="Login" />
                <Form.Input type="password" label="Password" />
                <Form.Input type="password" label="Password Confirmation" />
                <Form.Select label="Role" options={userRoleOptions} />
                <Stack alignItems="center" justifyContent="space-between">
                    <Link href="#/auth/login" primary>
                        Sign In
                    </Link>
                    <Form.Button type="submit" primary>
                        Create
                    </Form.Button>
                </Stack>
            </Form>
        </AuthLayout>
    );
};
