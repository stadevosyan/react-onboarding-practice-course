import React from 'react';
import { Form, Link, ButtonGroup } from '@servicetitan/design-system';
import { AuthLayout } from './layouts/auth-layout';

import * as Styles from './auth-form.less';

export const LoginForm = () => {
    return (
        <AuthLayout header="Login">
            <Form>
                <Form.Input label="Login" />
                <Form.Input type="password" label="Password" />
                <ButtonGroup fullWidth equalWidth>
                    <Link href="#/auth/register" primary>
                        Sign Up
                    </Link>
                    <Form.Button type="submit" primary className={Styles.test}>
                        Login
                    </Form.Button>
                </ButtonGroup>
            </Form>
        </AuthLayout>
    );
};
