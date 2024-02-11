// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = ({user}) => {
    const userRole = user.roles[0].name;
    const navGroups = menuItem.items.map((item) => {
        if(item.type === 'admin' && userRole === 'SuperAdmin') {
            return <NavGroup key={item.id} item={item} />;
        } else if(item.type === 'teacher' && userRole === 'teacher') {
            return <NavGroup key={item.id} item={item} />;
        } else if(item.type === 'parent' && userRole === 'parent') {
            return <NavGroup key={item.id} item={item} />;
        } else if(item.type === 'student' && userRole === 'student') {
            return <NavGroup key={item.id} item={item} />;
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
