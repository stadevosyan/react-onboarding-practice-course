import React from 'react';
import { Page, Sidebar, SideNav } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';
import { observer } from 'mobx-react';
import { AppUserStore } from '../../stores/user.store';
import { useDependencies } from '@servicetitan/react-ioc';

const title = 'react onboarding practice course';

export const MainLayout: React.FC = observer(({ children }) => {
    const [{ logout }] = useDependencies(AppUserStore);

    return (
        <Page
            backgroundColor="white"
            sidebar={
                <Sidebar>
                    <Sidebar.Section padding="y">
                        <SideNav title={title.toUpperCase()}>
                            <SideNavLinkItem pathname="/users">Users</SideNavLinkItem>
                            <SideNavLinkItem pathname="/news-feed">News Feed</SideNavLinkItem>
                            <SideNav.Item className={'m-t-2'} onClick={logout}>
                                Logout
                            </SideNav.Item>
                        </SideNav>
                    </Sidebar.Section>
                </Sidebar>
            }
        >
            {children}
        </Page>
    );
});
