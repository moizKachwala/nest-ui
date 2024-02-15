// assets
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UserOutlined
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
            title: 'Students',
            type: 'item',
            url: '/students',
            icon: icons.UserOutlined,
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
