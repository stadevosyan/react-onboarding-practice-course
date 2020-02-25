import React from 'react';
import { Page, Sidebar, SideNav } from '@servicetitan/design-system';
import { navItems } from '../../config/nav-item-data';
import { SideNavItem, SideNavItemProps } from '../side-nav/side-nav-item';
import { LogoutNavItem } from '../side-nav/logout-item';
import { useHistory } from 'react-router';

const title = 'react onboarding practice course';

interface ISideNavComponents {
    [componentName: string]: React.FC<SideNavItemProps>;
}

const SideNavComponents: ISideNavComponents = {
    SideNavItem,
    LogoutNavItem
};

export const MainLayout: React.FC = ({ children }) => {
    const {
        location: { pathname }
    } = useHistory();

    const order = navItems.find(item => item.path === pathname)!.order;

    return (
        <Page
            backgroundColor="white"
            sidebar={
                <Sidebar>
                    <Sidebar.Section padding="y">
                        <SideNav title={title.toUpperCase()}>
                            {navItems.map(navItem => {
                                let NavItemComponent;
                                const itemProps = {
                                    ...navItem,
                                    active: order === navItem.order
                                };

                                if (navItem.type === 'action') {
                                    NavItemComponent = SideNavComponents[navItem.componentName!];
                                    delete itemProps.componentName;
                                } else {
                                    NavItemComponent = SideNavComponents['SideNavItem'];
                                }

                                return <NavItemComponent key={navItem.order} {...itemProps} />;
                            })}
                        </SideNav>
                    </Sidebar.Section>
                </Sidebar>
            }
        >
            {children}
        </Page>
    );
};
