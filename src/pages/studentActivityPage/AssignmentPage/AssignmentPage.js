import { useEffect, useState } from "react";
import {
    Container, CircularProgress, Button, TextField, Grid,
    Paper,Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Formik } from "formik";
import {useParams} from 'react-router-dom';

export default function AssignmentPage(props) {
    const { essayTitlesPending, validatePending, initialValues, assignedActivity,
        validations,
        actions: { getAssignedActivityById, submitAssignment }
    } = props;
    let { activityAssignmentId } = useParams();
    const questionId = assignedActivity?.activity?.questions[0].id;
    
    useEffect(() => {
        getAssignedActivityById(activityAssignmentId);
    }, [getAssignedActivityById, activityAssignmentId]);

    return (
        <div>
            <Container maxWidth="lg">
            <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        
                        if (!values.content) {
                            errors.content = 'content is required'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setStatus, setSubmitting }) => {

                        let payload = {
                            responses: [
                                {
                                    questionId,
                                    answer: values.content
                                }
                            ]
                        }

                        submitAssignment(assignedActivity.id, payload);
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
                                        {assignedActivity?.activity?.questions[0].title}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                multiline
                                                rows={8}
                                                required
                                                label="content"
                                                name="content"
                                                margin="normal"
                                                inputProps={{
                                                    spellCheck: false,
                                                }}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={assignedActivity.completed ? assignedActivity?.questionResponses[0]?.answer : values.content}
                                                helperText={touched.content && errors.content}
                                                error={Boolean(touched.content && errors.content)}
                                            />
                                        </FormControl>
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
                                            disabled={assignedActivity.completed || essayTitlesPending || validatePending}
                                        >
                                            {(essayTitlesPending || validatePending) ? 'Evaluate Changes' : 'Evaluate'}
                                        </Button>
                                        &nbsp; {validatePending && <CircularProgress size={20} />}
                                    </Grid>
                                </Grid>
                                
                                {assignedActivity.completed && (
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h1>{Response}</h1>
                                            <div dangerouslySetInnerHTML={{ __html: assignedActivity?.questionResponses[0]?.validation.replace(/\n/g, '<br />')}} />
                                        </Grid>
                                    </Grid>
                                )}
                            </div>
                        </form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}