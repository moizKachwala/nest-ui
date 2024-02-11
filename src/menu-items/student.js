// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

const admin = {
    id: 'group-student',
    title: 'Student',
    type: 'student',
    children: [
        {
            id: 'chatPage',
            title: 'Write Essay',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        }
    ]
};

export default admin;
