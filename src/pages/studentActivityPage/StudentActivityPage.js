import { useEffect, useState } from "react";
import {Container, Card, CardContent, Typography} from "@mui/material";
import ChatPage from "pages/ChatPage/ChatPage";
import { Link } from 'react-router-dom';

export default function ActivityPage(props) {
    const { data, studentId,
      actions: { getActivities } } = props;
    const [selectedCard, setSelectedCard] = useState(null);
    
      useEffect(() => {
        getActivities(studentId);
    }, [getActivities, studentId]);

    const handleCardClick = (itemId) => {
        
      };

    return (
        <Container component="main" maxWidth="sm">
            <h1>ActivityPage</h1>
            <div>
                {data.map(({id, activity}) => (
                    <div key={id}>
                    <Card 
                        sx={{ minWidth: 275, marginBottom: 2, cursor: 'pointer' }} 
                        onClick={() => handleCardClick(id)}
                    >
                        <CardContent>
                        <Link to={`/activity/${activity.id}`}>
                            <Typography variant="h5" component="div">
                                {activity.name}
                            </Typography>
                            <Typography variant="body2">
                                {activity.questions[0].title}
                            </Typography>
                        </Link>
                        </CardContent>
                    </Card>
                    {/* Conditionally render EssayActivity component */}
                    {selectedCard === id && <ChatPage />}
                    </div>
                ))}
                </div>
            
    </Container>
    );
}