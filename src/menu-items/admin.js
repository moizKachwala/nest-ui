// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

const admin = {
    id: 'group-admin',
    title: 'Admministrator',
    type: 'admin',
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

export default admin;
