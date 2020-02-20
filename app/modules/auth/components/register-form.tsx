import React from 'react';
import { Form, Link, Stack } from '@servicetitan/design-system';
import { AuthLayout } from './layouts/auth-layout';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { UserRole } from '../../common/enums/user-role';
import { enumToOptions, Label } from '@servicetitan/form';
import { RegisterStore } from '../stores/register.store';
import { observer } from 'mobx-react';

export const RegisterForm = provide({
    singletons: [RegisterStore]
})(
    observer(() => {
        const [store] = useDependencies(RegisterStore);
        const registerForm = store.formState.$;

        const { login: loginField } = registerForm;
        const { password: passwordField } = registerForm;
        const { passwordConfirm: passwordConfirmField } = registerForm;
        const { role: roleField } = registerForm;

        const { register: registerAction } = store;
        const userRoleOptions = enumToOptions(UserRole);
        return (
            <AuthLayout header="Register">
                <Form onSubmit={registerAction}>
                    <Form.Input
                        label={
                            <Label
                                label="Login"
                                hasError={loginField.hasError}
                                error={loginField.error}
                            />
                        }
                        value={loginField.value}
                        onChange={loginField.onChangeHandler}
                        error={loginField.hasError}
                    />
                    <Form.Input
                        type="password"
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
                    />
                    <Form.Input
                        type="password"
                        label={
                            <Label
                                label="Password Confirmation"
                                hasError={passwordConfirmField.hasError}
                                error={passwordConfirmField.error}
                            />
                        }
                        value={passwordConfirmField.value}
                        onChange={passwordConfirmField.onChangeHandler}
                        error={passwordConfirmField.hasError}
                    />
                    <Form.Select
                        label="Role"
                        options={userRoleOptions}
                        onChange={roleField.onChangeHandler}
                        value={roleField.value}
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
