import Iconify from '../../Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon('eva:pie-chart-2-fill')
    },
    {
        title: 'INFO',
        path: '/info',
        icon: getIcon('eva:people-fill')
    },
    {
        title: 'Not found',
        path: '/404',
        icon: getIcon('eva:alert-triangle-fill')
    }
];
  
export default sidebarConfig;