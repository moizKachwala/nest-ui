import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from 'formik';

export default function LoginPage(props) {
    const { initialValues, loginPending, loginError, loginErrorMessage, 
      actions: { sessionLogin } } = props;
    
    return (
        <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
       initialValues={initialValues}
       validate={values => {
        const errors = {};

          if (!values.username) {
            errors.username = "Username is required."
          }

          if (!values.password) {
            errors.password = "Password is required."
          }

          return errors;
       }}
       onSubmit={(values) => {
          sessionLogin(values.username, values.password, values.rememberMe);
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
         /* and other goodies */
       }) => (
         <form noValidate={true}
          autoComplete="off"
          onSubmit={handleSubmit}>
          {loginError && (
                <div role="alert" className="alert alert-danger">
                    <div className="alert-text">{loginErrorMessage}</div>
                </div>
            )}
            <TextField
                type="username"
                label="Username"
                margin="normal"
                name="username"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                helperText={touched.username && errors.username}
                error={Boolean(touched.username && errors.username)}
            />
           {errors.email && touched.email && errors.email}
           <TextField
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                helperText={touched.password && errors.password}
                error={Boolean(touched.password && errors.password)}
            />
           {errors.password && touched.password && errors.password}
           <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loginPending}
                size="large"
            >
                {loginPending ? 'Loading...' : 'Sign In'}
            </Button>
         </form>
       )}
     </Formik>
      </Box>
    </Container>
    );
}