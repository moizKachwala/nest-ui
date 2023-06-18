// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

// const dashboard = {
//     id: 'group-dashboard',
//     title: 'Navigation',
//     type: 'group',
//     children: [
//         {
//             id: 'dashboard',
//             title: 'Dashboard',
//             type: 'item',
//             url: '/dashboard/default',
//             icon: icons.DashboardOutlined,
//             breadcrumbs: false
//         }
//     ]
// };

// export default dashboard;

const dashboard = {
    id: 'group-dashboard',
    title: 'Test',
    type: 'group',
    children: [
        {
            id: 'chatPage',
            title: 'Essay',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
