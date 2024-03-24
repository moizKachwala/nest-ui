import { useEffect, useState } from "react";
import {
    Container, CircularProgress, Button, TextField, Grid,
    Paper,Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Formik } from "formik";
import {useParams} from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import {MCQComponent} from '../../../common';

export default function AssignmentPage(props) {
    const { activityAssignmentsPending, initialValues, assignedActivity, activityAssignmentId,
        actions: { getAssignedActivityById, submitAssignment }
    } = props;
    // const questionId = assignedActivity?.activity?.questions[0].id;
    const activityType = assignedActivity.activity?.name; 
    const questions = assignedActivity?.activity?.questions || [];
    const { showToast } = useToast();
    let navigate = useNavigate();
    
    useEffect(() => {
        getAssignedActivityById(activityAssignmentId);
    }, [getAssignedActivityById, activityAssignmentId]);

    function callback() {
        showToast('Activity submitted successfully', 'success');
        navigate('/student/activities');
    }

    return (
        <div>
            <Container maxWidth="lg">
            <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        
                        // if (!values.content) {
                        //     errors.content = 'content is required'
                        // }

                        return errors;
                    }}
                    onSubmit={(values, { setStatus, setSubmitting }) => {
                        let payload = {}
                        if (activityType === 'Essay') {
                          payload = {
                            responses: [{
                              questionId: assignedActivity.activity.questions[0].id,
                              answer: values.content,
                            }],
                          };
                        } else {
                          payload = {
                            responses: Object.entries(values.mcqAnswers).map(([questionId, answer]) => ({
                              questionId,
                              answer,
                            })),
                          };
                        }
                        console.log(payload);

                        submitAssignment(assignedActivity.id, payload, callback);
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
                        <Grid container spacing={2}>
                          {activityType === 'Essay' ? (
                            // Render TextBox for Essay
                            <Grid item xs={12}>
                              <TextField
                                multiline
                                rows={8}
                                required
                                label="Content"
                                name="content"
                                margin="normal"
                                inputProps={{ spellCheck: false }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.content}
                                helperText={touched.content && errors.content}
                                error={Boolean(touched.content && errors.content)}
                              />
                            </Grid>
                          ) : (
                            // Render MCQComponent for each MCQ question
                            questions.map((question, index) => (
                              <Grid item xs={12} key={question.id}>
                                <MCQComponent
                                  name={`mcqAnswers.${question.id}`}
                                  questionProp={question.title}
                                  choicesProp={question.details?.choices || []} // Adjust this based on your structure
                                  mode="answer"
                                  setFieldValue={setFieldValue}
                                  selectedAnswer={values.mcqAnswers[question.id]}
                                />
                                {errors.mcqAnswers && errors.mcqAnswers[question.id] && (
                                  <Typography color="error">{errors.mcqAnswers[question.id]}</Typography>
                                )}
                              </Grid>
                            ))
                          )}
                        </Grid>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          // disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                        {isSubmitting && <CircularProgress />}
                      </form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}