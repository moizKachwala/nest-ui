import { useEffect, useState } from "react";
import {
    InputLabel, Container, CircularProgress, Button, Dialog, DialogContent, DialogTitle, TextField, makeStyles, Grid,
    ListItem, IconButton, ListItemButton,
    Switch, FormControlLabel, AlertTitle, Alert, Box
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, FieldArray } from "formik";
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { MCQComponent } from '../../common';

export default function McqPage(props) {

    const { essayTitlesPending, validatePending, initialValues, mcqQuestions,
        getParentId, students, questionPending,
        validations,
        actions: { getMcqQuestions, studentsGet, activityCreate }
    } = props;
    const [hint, setHint] = useState('');
    const [checked, setChecked] = useState([]);
    // const [difficulty, setDifficulty] = useState('easy');

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
        studentsGet(getParentId);
    }, [studentsGet, getParentId]);

    function loadMCQQuestions(topic) {
        const payload = {
            type: 'MCQ',
            topic,
        }
        getMcqQuestions(payload);
    }

    return (
        <div>
            <Container maxWidth="lg">
                <h1>Assign an essay activity {(questionPending || validatePending) && <CircularProgress size={20} />} </h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        if (!values.topic) {
                            errors.topic = 'title is required'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setStatus, setSubmitting }) => {
                        const questionType = "MCQ";
                        let payload = {
                            name: `${values.topic} Activity`,
                            description: `MCQ Questions related to ${values.topic}`,
                            activityTypeId: '4ad80169-98e8-4d8d-9a2b-466f1724854a',
                            subjectId: '2f82cf72-5787-41e1-a9c0-2e0bd50a8a36',
                            questions: values.selectedQuestionIndices.map(index => ({
                                        ...mcqQuestions[index],
                                        type: questionType,
                            })),
                            assignments: checked.map((id) => ({ studentId: id })),
                        }
                        activityCreate(payload);

                        // shouldReloadGrid = true;
                        // let payload = {
                        //     name: values.name,
                        //     description: values.description,
                        //     ein: values.ein,
                        //     active: values.active,
                        // }
                        // if (mode === 'create') {
                        //     facilityCreate(payload, handleCallback, shouldReloadGrid);
                        // }
                        // else {
                        //     payload = {
                        //         ...payload,
                        //         id: values.id,
                        //     }
                        //     facilityUpdate(payload, handleCallback, shouldReloadGrid);
                        // }
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
                                    {/* <Grid item xs={12}>
                                            <div className="error">
                                                {renderMessage()}
                                            </div>
                                        </Grid> */}

                                    <Grid item xs={12}>
                                        {/* {titles.map(({ title }) => (
                                                    <ListItem
                                                    key={title}
                                                    disablePadding
                                                  >
                                                    <ListItemButton role={undefined} onClick={handleToggle(title)} dense>
                                                        <ListItemIcon>
                                                            <Checkbox
                                                            edge="start"
                                                            checked={checked.indexOf(title) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': title }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText id={title} primary={title} />
                                                        </ListItemButton>
                                                  </ListItem>
                                        ))} */}

                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Topics</InputLabel>
                                            <Select
                                                required
                                                value={values.topic}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: "topic",
                                                    id: "topic",
                                                }}
                                            >
                                                <MenuItem value="Noun">
                                                    Noun
                                                </MenuItem>
                                                <MenuItem value="Verb">
                                                    Verb
                                                </MenuItem>
                                                <MenuItem value="Ajective">
                                                    Ajective
                                                </MenuItem>
                                                <MenuItem value="Adverb">
                                                    Adverb
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container justifyContent="flex-end">
                                            <Button variant="contained"
                                                type="button"
                                                onClick={() => loadMCQQuestions(values.topic)}
                                            // disabled={essayTitlesPending || validatePending}
                                            >
                                                Get
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <FieldArray name="questions">
                                            {() => (
                                                mcqQuestions.map((question, index) => (
                                                    <Grid container spacing={2} key={question.id} alignItems="center">
                                                        <Grid item>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                    checked={values.selectedQuestionIndices.includes(index)}
                                                                        onChange={(e) => {
                                                                            if (e.target.checked) {
                                                                              setFieldValue('selectedQuestionIndices', [...values.selectedQuestionIndices, index]);
                                                                            } else {
                                                                              setFieldValue(
                                                                                'selectedQuestionIndices',
                                                                                values.selectedQuestionIndices.filter(i => i !== index)
                                                                              );
                                                                            }
                                                                          }}
                                                                    />
                                                                }
                                                                label=""
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MCQComponent
                                                                name={`questions[${index}]`}
                                                                questionProp={question.question}
                                                                choicesProp={question.choices}
                                                                mode="edit" // Assuming mode is determined by the parent component's logic
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                ))
                                            )}
                                        </FieldArray>
                                    </Grid>


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
                                            disabled={essayTitlesPending || validatePending}
                                        >
                                            {(essayTitlesPending || validatePending) ? 'Assigning...' : 'Assign Activity'}
                                        </Button>
                                        &nbsp; {validatePending && <CircularProgress size={20} />}
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