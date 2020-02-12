import React from 'react';
import { HashRouter } from 'react-router-dom';

import { Stack } from '@servicetitan/design-system';

import { Placeholder } from './modules/common/components/placeholder';

import * as Styles from './app.less';

export const App: React.FC = () => (
    <React.StrictMode>
        <HashRouter>
            <Stack alignItems="center" justifyContent="center" className={Styles.app}>
                <Placeholder />
            </Stack>
        </HashRouter>
    </React.StrictMode>
);
