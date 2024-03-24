import React, {useEffect} from 'react';
import { useField, useFormikContext } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, TextField, Grid } from '@mui/material';

const EssayComponent = ({ titles }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField('title');
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="essay-title-select-label">Essay Titles</InputLabel>
          <Select
            labelId="essay-title-select-label"
            id="title"
            {...field}
            error={meta.touched && Boolean(meta.error)}
            onChange={(e) => setFieldValue('title', e.target.value)}
          >
            {titles && titles.map(({title}) => (
              <MenuItem key={title} value={title}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="hint"
          name="hint"
          label="Hint"
          value={field.value.hint}
          onChange={(e) => setFieldValue('hint', e.target.value)}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="wordLimit"
          name="wordLimit"
          label="Word Limit"
          type="number"
          value={field.value.wordLimit}
          onChange={(e) => setFieldValue('wordLimit', e.target.value)}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      </Grid>
    </Grid>
  );
};

export default EssayComponent;