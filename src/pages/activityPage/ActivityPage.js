import { useEffect, useState } from "react";
import {Container, Card, CardContent, Typography} from "@mui/material";
import ChatPage from "pages/ChatPage/ChatPage";
import { Link } from 'react-router-dom';

export default function ActivityPage(props) {
    const { data, 
      actions: { activityTypesList } } = props;
    const [selectedCard, setSelectedCard] = useState(null);
    
      useEffect(() => {
        activityTypesList();
    }, [activityTypesList]);

    const handleCardClick = (itemId) => {
        
      };

    return (
        <Container component="main" maxWidth="xs">
            <h1>ActivityPage</h1>
            <div>
                {data.map(item => (
                    <div key={item.id}>
                    <Card 
                        sx={{ minWidth: 275, marginBottom: 2, cursor: 'pointer' }} 
                        onClick={() => handleCardClick(item.id)}
                    >
                        <CardContent>
                        <Link to="/activity/essay">
                            <Typography variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2">
                                {item.description}
                            </Typography>
                        </Link>
                        </CardContent>
                    </Card>
                    {/* Conditionally render EssayActivity component */}
                    {selectedCard === item.id && <ChatPage />}
                    </div>
                ))}
                </div>
            
    </Container>
    );
}