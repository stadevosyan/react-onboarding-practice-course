export interface INavItem {
    name: string;
    path?: string;
    className?: string;
    actionName?: string;
    componentName?: string;
    type: 'navigate' | 'action';
    order: number;
}

export const navItems: INavItem[] = [
    {
        name: 'Users',
        path: '/users',
        type: 'navigate',
        order: 1
    },
    {
        name: 'News Feed',
        path: '/news-feed',
        type: 'navigate',
        order: 2
    },
    {
        name: 'Logout',
        type: 'action',
        componentName: 'LogoutNavItem',
        className: 'm-t-2',
        order: 3
    }
];
