import React from 'react';
import { SideNav } from '@servicetitan/design-system';
import { useHistory } from 'react-router-dom';

export interface SideNavItemProps {
    name: string;
    path?: string;
    className?: string;
    active?: boolean;
    type: 'navigate' | 'action';
    onClick?: () => void;
}

export const SideNavItem: React.FC<SideNavItemProps> = ({
    name,
    className,
    type,
    path,
    active,
    onClick
}) => {
    const history = useHistory();

    let onClickHandler;
    if (type === 'navigate') {
        onClickHandler = () => history.push(path!);
    } else {
        onClickHandler = () => onClick!();
    }

    return (
        <SideNav.Item className={className} onClick={onClickHandler} active={!!active}>
            {name}
        </SideNav.Item>
    );
};
