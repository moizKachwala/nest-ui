import { useEffect } from "react";
import {
    InputLabel, Container, CircularProgress, Button, Dialog, DialogContent, DialogTitle, TextField, makeStyles, Grid,
    Switch, FormControlLabel
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik } from "formik";

export default function ChatPage(props) {

    const { essayTitlesPending, validatePending, initialValues, titles,
        validations,
        actions: { getTitles, validateEssay }
    } = props;

    // useEffect(() => {
    //     getTitles();
    // }, [getTitles]);

    return (
        <Container maxWidth="lg">
            <h1>Essay </h1>

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
                            <Grid container>
                                {/* <Grid item xs={12}>
                                            <div className="error">
                                                {renderMessage()}
                                            </div>
                                        </Grid> */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Essay Titles</InputLabel>
                                        <Select
                                            required
                                            value={values.title}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "title",
                                                id: "title",
                                            }}
                                        >
                                            {titles.map(({ title }) => (
                                                <MenuItem
                                                    key={title}
                                                    value={title}
                                                >
                                                    {title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            multiline
                                            rows={4}
                                            required
                                            label="content"
                                            name="content"
                                            margin="normal"
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
                            <Grid container>
                                <Grid item xs={12}>
                                    <h1>Response New1</h1>
                                    {<h3>{validations.response}</h3>}

                                </Grid>
                            </Grid>
                        </div>
                    </form>
                )}
            </Formik>

        </Container>
    );
}