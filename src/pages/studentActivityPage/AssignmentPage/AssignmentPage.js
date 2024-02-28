import { useEffect, useState } from "react";
import {
    Container, CircularProgress, Button, TextField, Grid
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Formik } from "formik";
import {useParams} from 'react-router-dom';

export default function AssignmentPage(props) {

    // const { activityId } = useParams();
    const { essayTitlesPending, validatePending, initialValues, assignedActivity,
        validations,
        actions: { validateEssay }
    } = props;
    console.log({assignedActivity});
    // const [hint, setHint] = useState('');
    // const [difficulty, setDifficulty] = useState('easy');

    // useEffect(() => {
    //     getActivity(activityId);
    // }, [getActivity, activityId]);

    // function handleTitleChange(event, handleChange) {
    //     handleChange(event);
    //     const title = titles.find(x => x.title === event.target.value);
    //     if (title) {
    //         setHint(title.hint);
    //     }
    // }

    return (
        <div>
            <Container maxWidth="lg">
                <h1>Essay {(essayTitlesPending || validatePending) && <CircularProgress size={20} />} </h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = 'title is required'
                        }

                        if (!values.content) {
                            errors.content = 'content is required'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setStatus, setSubmitting }) => {

                        let payload = {
                            title: values.title,
                            content: values.content
                        }

                        validateEssay(payload);

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
                                    <Grid item xs={12}>
                                        {assignedActivity.activity.questions[0].title}
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
                                                value={values.content}
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
                                            disabled={essayTitlesPending || validatePending}
                                        >
                                            {(essayTitlesPending || validatePending) ? 'Evaluate Changes' : 'Evaluate'}
                                        </Button>
                                        &nbsp; {validatePending && <CircularProgress size={20} />}
                                    </Grid>
                                </Grid>
                                
                                {validations && (
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h1>Response</h1>
                                            <div dangerouslySetInnerHTML={{ __html: validations.replace(/\n/g, '<br />')}} />
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