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

export default function EssayPage(props) {

    const { essayTitlesPending, validatePending, initialValues, titles,
        getParentId, students,
        validations,
        actions: { getTitles, studentsGet, activityCreate }
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
        getTitles();
        studentsGet(getParentId);
    }, [getTitles, studentsGet, getParentId]);

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
                <h1>Assign an essay activity {(essayTitlesPending || validatePending) && <CircularProgress size={20} />} </h1>
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
                            activityTypeId: 'b5e57316-b090-49d4-9cc2-d9ba9abb1964',
                            subjectId: '872513a2-d407-4518-97e6-e4838cd084fa',
                            questions: [
                                {
                                    title: values.title,
                                    hints: 'some hints',
                                    wordLimit: 1000
                                }
                            ],
                            assignments: checked.map((id) => ({studentId: id})),
                        }
                        console.log({payload});
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