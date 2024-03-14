import { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Grid, Chip, Box, Tabs, Tab, useTheme, CardActionArea, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ChatPage from "pages/ChatPage/ChatPage";
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Loadable } from "../../../common";
import {useParams} from 'react-router-dom';

export default function StudentDetailsPage(props) {
    const { data, activityAssignmentsPending,
        actions: { getActivities } } = props;
        let { studentId } = useParams();

    useEffect(() => {
        getActivities(studentId);
    }, [getActivities, studentId]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Filter activities based on completion status
    const filteredData = value === 0 ? data.filter(item => !item.completed) : data.filter(item => item.completed);

    return (
        <Loadable loading={activityAssignmentsPending}>
        <Container component="main" maxWidth="md">
            <Typography variant="h4" component="h1" color="primary" gutterBottom style={{ fontWeight: 'bold' }}>
                StudentDetailsPage
            </Typography>
            <Box sx={{ width: '100%', mb: 3 }}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                    <Tab icon={<TaskAltIcon />} label="Pending" />
                    <Tab icon={<EmojiEventsIcon />} label="Completed" />
                </Tabs>
            </Box>
            <Grid container spacing={2}>
                {filteredData.map(({ completed, id, activity, endTime }) => (
                    <Grid item key={id} xs={12}>
                        <Card
                            variant="outlined"
                            sx={{
                                position: 'relative',
                                ':hover': { boxShadow: 8, transform: 'scale(1.03)' },
                                transition: '0.3s',
                                borderColor: completed ? 'primary.main' : 'secondary.main', // border color changes
                                backgroundColor: 'transparent', // background set to transparent
                            }}
                        >
                            <CardActionArea component={Link} to={`/activity/${id}`}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                        <SchoolIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                        {activity.name}
                                    </Typography>
                                    <Typography variant="h5" component="div" gutterBottom sx={{ textDecoration: 'underline', color: completed ? 'primary.main' : 'secondary.main' }}>
                                        {activity.questions[0].title}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        End: {endTime}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Chip label={completed ? "Completed" : "Pending"}
                                color={completed ? "success" : "warning"}
                                size="small"
                                sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }} />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
        </Loadable>
    );
}