import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { Card, CardContent, Divider, TextField, Button, IconButton, Radio, Checkbox, FormControlLabel, Grid, RadioGroup, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import startCase from 'lodash/startCase';
import get from 'lodash/get'; // Ensure lodash's get is imported

const MCQComponent = ({ name, questionProp, choicesProp, mode = "view" }) => {
  const { setFieldValue, values } = useFormikContext();
  const [question, setQuestion] = useState(questionProp);
  const [choices, setChoices] = useState(choicesProp);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
    if (mode === "edit") {
      setFieldValue(`${name}.question`, event.target.value);
    }
  };

  const handleChoiceChange = (index, event) => {
    const newChoices = choices.map((choice, i) =>
      i === index ? { ...choice, text: event.target.value } : choice
    );
    setChoices(newChoices);
    if (mode === "edit") {
      setFieldValue(`${name}.choices`, newChoices);
    }
  };

  const handleSelectCorrect = (index, isCorrect) => {
    const updatedChoices = choices.map((choice, i) =>
      i === index ? { ...choice, isCorrect: isCorrect } : choice
    );
    setChoices(updatedChoices);
    if (mode === "edit") {
      setFieldValue(`${name}.choices`, updatedChoices);
    }
  };

  const handleSelectAnswer = (event) => {
    setFieldValue(`${name}`, event.target.value);
  };

  // Adjusted value access
  const selectedAnswer = get(values, `${name}`, '');

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {mode === "edit" ? (
              <TextField
                fullWidth
                label="Question"
                variant="outlined"
                value={question}
                onChange={handleQuestionChange}
              />
            ) : (
              <Grid item xs={12}>
            <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold' }}>
              {questionProp}
            </Typography>
            <Divider style={{ marginBottom: '20px' }} /> {/* Separator for the question */}
          </Grid>
            )}
          </Grid>
          {mode === "answer" ? (
            <Grid item xs={12}>
              <RadioGroup name={`${name}`} value={selectedAnswer} onChange={handleSelectAnswer}>
              {choicesProp.map((choice, index) => (
                <React.Fragment key={index}>
                  <FormControlLabel
                    value={choice.text}
                    control={<Radio />}
                    label={<Typography variant="subtitle1">{startCase(choice.text)}</Typography>}
                  />
                  {index < choicesProp.length - 1 && <Divider style={{ marginTop: '5px', marginBottom: '5px', backgroundColor: '#f0f0f0' }} />} {/* Light color separator between choices */}
                </React.Fragment>
              ))}
            </RadioGroup>
            </Grid>
          ) : (
            choices.map((choice, index) => (
              <Grid item xs={12} key={index} style={{ display: 'flex', alignItems: 'center' }}>
                {mode === "edit" && (
                  <Checkbox
                    checked={choice.isCorrect}
                    onChange={(e) => handleSelectCorrect(index, e.target.checked)}
                    color="primary"
                  />
                )}
                <TextField
                  fullWidth
                  label={`Choice ${index + 1}`}
                  variant="outlined"
                  value={startCase(choice.text)}
                  onChange={(e) => handleChoiceChange(index, e)}
                  disabled={mode === "answer"}
                />
                {mode === "edit" && (
                  <IconButton color="error" onClick={() => setChoices(choices.filter((_, i) => i !== index))}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Grid>
            ))
          )}
          {mode === "edit" && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setChoices([...choices, { text: '', isCorrect: false }])}
              >
                Add Choice
              </Button>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MCQComponent;