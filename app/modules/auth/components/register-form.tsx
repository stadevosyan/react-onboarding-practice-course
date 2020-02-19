import React from 'react';
import { Form, Link, ButtonGroup } from '@servicetitan/design-system';
import { AuthLayout } from './layouts/auth-layout';
import { UserRole } from '../../common/enums/user-role';
import { enumToOptions } from '@servicetitan/form';

import * as Styles from './auth-form.less';

export const RegisterForm = () => {
    const userRoleOptions = enumToOptions(UserRole);

    return (
        <AuthLayout header="Register">
            <Form>
                <Form.Input label="Login" />
                <Form.Input type="password" label="Password" />
                <Form.Input type="password" label="Password Confirmation" />
                <Form.Select label="Role" options={userRoleOptions} />
                <ButtonGroup fullWidth equalWidth>
                    <Link href="#/auth/login" primary>
                        Sign In
                    </Link>
                    <Form.Button type="submit" primary className={Styles.test}>
                        Create
                    </Form.Button>
                </ButtonGroup>
            </Form>
        </AuthLayout>
    );
};
