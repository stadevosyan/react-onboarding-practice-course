import React from 'react';
import { observer } from 'mobx-react';
import { AppUserStore } from '../../stores/user.store';
import { useDependencies } from '@servicetitan/react-ioc';
import { SideNavItem, SideNavItemProps } from './side-nav-item';

export const LogoutNavItem: React.FC<SideNavItemProps> = observer(({ ...props }) => {
    const [{ logout }] = useDependencies(AppUserStore);
    return <SideNavItem {...props} onClick={logout} />;
});
