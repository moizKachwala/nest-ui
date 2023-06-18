import { useEffect, useState } from "react";
import {
    InputLabel, Container, CircularProgress, Button, Dialog, DialogContent, DialogTitle, TextField, makeStyles, Grid,
    Switch, FormControlLabel, AlertTitle, Alert, Box
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
    const [hint, setHint] = useState('');
    // const [difficulty, setDifficulty] = useState('easy');

    useEffect(() => {
        getTitles();
    }, [getTitles]);

    function handleTitleChange(event, handleChange) {
        handleChange(event);
        const title = titles.find(x => x.title === event.target.value);
        if (title) {
            setHint(title.hint);
        }
    }

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
                                                onChange={(event) => handleTitleChange(event, handleChange)}
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
                                    )}

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
                                {validations.response && (
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h1>Response</h1>
                                            {validations.response}
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