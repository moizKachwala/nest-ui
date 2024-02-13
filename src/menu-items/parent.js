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

const parent = {
    id: 'group-parent',
    title: 'parent',
    type: 'parent',
    children: [
        {
            id: 'students',
            title: 'students',
            type: 'item',
            url: '/students',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'essay',
            title: 'Essay',
            type: 'item',
            url: '/chat',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        }
    ]
};

export default parent;
