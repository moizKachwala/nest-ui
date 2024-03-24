import { useEffect, useState } from "react";
// import ChatPage from "pages/ChatPage/ChatPage";
import { Link } from 'react-router-dom';
import {Container, Card, CardContent, Typography, CardActionArea, CardActions, IconButton} from "@mui/material";
import SubjectIcon from '@mui/icons-material/Subject';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalculateIcon from '@mui/icons-material/Calculate';

export default function ActivitiesPage(props) {
    const getIcon = (type, color) => {
        switch (type) {
            case 'essay':
                return <SubjectIcon sx={{ color }} />;
            case 'mcq':
                return <CheckCircleOutlineIcon sx={{ color }} />;
            case 'math':
                return <CalculateIcon sx={{ color }} />;
            default:
                return <SubjectIcon sx={{ color }} />;
        }
    };

    const { activityTypes, 
      actions: { activityTypesList } } = props;
    const [selectedCard, setSelectedCard] = useState(null);
    
      useEffect(() => {
        activityTypesList();
    }, [activityTypesList]);

    const handleCardClick = (activityTypeId) => {
        
      };

    return (
        <Container component="main" maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Activities Page
            </Typography>
            {activityTypes.map(activityType => (
                <Card 
                    key={activityType.id} 
                    sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, '&:hover': { boxShadow: 6 }, pl: 2 }} 
                >
                    <IconButton edge="start" sx={{ marginRight: 1, color: 'inherit' }}>
                        {getIcon(activityType.type, activityType.iconColor)}
                    </IconButton>
                    <CardActionArea onClick={() => handleCardClick(activityType.id)} sx={{ display: 'flex', flexGrow: 1 }}>
                    {/* /activities/${activityType.id} */}
                        <Link to={`/activity/mcq`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {activityType.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {activityType.description}
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            ))}
        </Container>
    );
}