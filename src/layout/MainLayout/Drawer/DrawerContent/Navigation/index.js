// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = ({ user }) => {
    const userRole = user.roles[0].name;

    const filterNavItem = (item) => {
        const allowedRoles = {
            admin: 'Administrator',
            teacher: 'Teacher',
            parent: 'Parent',
            student: 'Student',
        };

        return userRole === allowedRoles[item.type];
    };

    const navGroups = menuItem.items
        .filter(filterNavItem)
        .map((item) => <NavGroup key={item.id} item={item} />);

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};


export default Navigation;
