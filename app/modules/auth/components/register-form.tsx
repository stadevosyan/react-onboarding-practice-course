import React from 'react';
import { Form, Link, Stack } from '@servicetitan/design-system';
import { AuthLayout } from './layouts/auth-layout';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { UserRole } from '../../common/enums/user-role';
import { enumToOptions } from '@servicetitan/form';
import { RegisterStore } from '../stores/register.store';
import { observer } from 'mobx-react';

export const RegisterForm = provide({
    singletons: [RegisterStore]
})(
    observer(() => {
        const [store] = useDependencies(RegisterStore);
        const registerForm = store.formState.$;

        const userRoleOptions = enumToOptions(UserRole);
        return (
            <AuthLayout header="Register">
                <Form>
                    <Form.Input
                        label="Login"
                        value={registerForm.login.value}
                        onChange={registerForm.login.onChangeHandler}
                    />
                    <Form.Input
                        type="password"
                        label="Password"
                        value={registerForm.password.value}
                        onChange={registerForm.password.onChangeHandler}
                    />
                    <Form.Input
                        type="password"
                        label="Password Confirmation"
                        value={registerForm.passwordConfirm.value}
                        onChange={registerForm.passwordConfirm.onChangeHandler}
                    />
                    <Form.Select
                        label="Role"
                        options={userRoleOptions}
                        onChange={registerForm.role.onChangeHandler}
                        value={registerForm.role.value}
                    />
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
    })
);
