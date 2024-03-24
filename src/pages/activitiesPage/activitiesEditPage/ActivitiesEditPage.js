import { useEffect, useState } from "react";
import {
    InputLabel, Container, CircularProgress, Button, Dialog, DialogContent, DialogTitle, TextField, makeStyles, Grid,
    ListItem,IconButton, ListItemButton,
    Switch, FormControlLabel, AlertTitle, Alert, Box
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik } from "formik";
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {renderErrorMessage} from '../../../utils/error';
import { useToast } from '../../../context/ToastContext';
import {MCQComponent, EssayComponent} from '../../../common';

export default function ActivitiesEditPage(props) {

    const { essayTitlesPending, validatePending, initialValues, titles, activityType,
        parentId, students, activityCreatePending,
        actions: { getTitles, studentsGet, activityCreate }
    } = props;
    
    const { showToast } = useToast();

    const [hint, setHint] = useState('');
    const [checked, setChecked] = useState([]);

    function callback() {
        showToast('Activity successfully created', 'success');
        setChecked([]);
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };

    useEffect(() => {
        getTitles();
        studentsGet(parentId);
    }, [getTitles, studentsGet, parentId]);

    function handleTitleChange(event, handleChange) {
        handleChange(event);
        const title = titles.find(x => x.title === event.target.value);
        if (title) {
            setHint(title.hint);
        }
    }

    const renderMessage = () => {
        const {
          activityCreateError, activityCreateErrorMessage,
        } = props;
        return renderErrorMessage(activityCreateError, activityCreateErrorMessage);
      }

    return (
        <div>
            <Container maxWidth="lg">
                <h1>Assign an essay activity {(essayTitlesPending || activityCreatePending) && <CircularProgress size={20} />} </h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = 'title is required'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setStatus, setSubmitting }) => {

                        let payload = {
                            name: 'Essay Activity',
                            description: 'essay writing',
                            activityTypeId: activityType?.id,
                            subjectId: '2f82cf72-5787-41e1-a9c0-2e0bd50a8a36',
                            questions: [
                                {
                                    title: values.title,
                                    hints: hint,
                                    wordLimit: 1000
                                }
                            ],
                            assignments: checked.map((id) => ({studentId: id})),
                        }
                        console.log({values});
                        //activityCreate(payload, callback);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                            <div className="error">
                                                {renderMessage()}
                                            </div>
                                        </Grid>
                                    <Grid item xs={12}>
                                    <MCQComponent
                                        name="mcq"
                                        questionProp="What is the capital of France?"
                                        choicesProp={[
                                            { text: "Paris", isCorrect: true },
                                            { text: "London", isCorrect: false },
                                        ]}
                                        mode="answer"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <EssayComponent titles={titles} />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <MCQComponent />
                                    </Grid> */}
                                    {/* <Grid item xs={12}>
                                        <Grid container justifyContent="flex-end">
                                            <Button variant="contained" 
                                                onClick={getTitles} 
                                                disabled={essayTitlesPending || validatePending}
                                            >
                                                Load more topics
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    {hint && (
                                        <Grid item xs={12}>
                                            <Alert severity="info">
                                                <AlertTitle>Hint</AlertTitle>
                                                <h2>{hint}</h2>
                                            </Alert>
                                        </Grid>
                                    )} */}

                                    <Grid item xs={12}>
                                         {students.map(({ id, user }) => (
                                            <ListItem
                                            key={id}
                                            disablePadding
                                            >
                                            <ListItemButton role={undefined} onClick={handleToggle(id)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(id) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': id }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={id} primary={`${user.firstName} ${user.lastName}`} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container justify="flex-end">
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            // className={classes.button}
                                            type="submit"
                                            disabled={essayTitlesPending || activityCreatePending}
                                        >
                                            {(activityCreatePending || essayTitlesPending ) ? 'Assigning...' : 'Assign Activity'}
                                        </Button>
                                        &nbsp; {activityCreatePending && <CircularProgress size={20} />}
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    )}
                </Formik>

            </Container>
        </div>
    );
}