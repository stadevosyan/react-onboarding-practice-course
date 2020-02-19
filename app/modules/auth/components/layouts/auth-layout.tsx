import React from 'react';
import { Stack, Text, Page } from '@servicetitan/design-system';

import * as Styles from './auth-layout.less';

interface AuthLayoutProps {
    header: 'Login' | 'Register';
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ header, children }) => {
    return (
        <Stack alignItems="center" justifyContent="center" className={Styles.content}>
            <Page backgroundColor="white" className={Styles.page}>
                <Text size={4} className="ta-center m-b-4">
                    {header}
                </Text>
                {children}
            </Page>
        </Stack>
    );
};
