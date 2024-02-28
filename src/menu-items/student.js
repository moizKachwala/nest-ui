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
            id: 'activity',
            title: 'My Activities',
            type: 'item',
            url: '/student/activities',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        }
    ]
};

export default admin;
