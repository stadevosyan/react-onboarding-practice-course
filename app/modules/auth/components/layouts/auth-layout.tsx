import React from 'react';
import { Stack, Text, Page, Banner } from '@servicetitan/design-system';

import * as Styles from './auth-layout.less';

interface AuthLayoutProps {
    header: 'Login' | 'Register';
    errorMsg: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ header, children, errorMsg }) => {
    return (
        <Stack alignItems="center" justifyContent="center" className={Styles.content}>
            <Page backgroundColor="white" className={Styles.page}>
                <Text size={4} className="ta-center m-b-2">
                    {header}
                </Text>
                {errorMsg && <Banner status="critical" className="m-b-2" title={errorMsg} />}
                {children}
            </Page>
        </Stack>
    );
};
