import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {FormValues} from "./types";
import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "../core/constants/localStorage";
import {useMutation} from "@tanstack/react-query";
import {loginUser} from "../core/requests/loginUser";

const schema = Yup.object().shape({
  username: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Min lenght - 6 characters")
    .required("Required"),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const {mutate: login} = useMutation(
    (values: FormValues) => loginUser(values),
    {
      onSuccess: (_, values) => {
        localStorage.setItem(
          LOCAL_STORAGE_USER_CREDENTIALS_LABEL,
          JSON.stringify(values)
        );
        navigate("/workspace");
      },
      onError: (error) => {
        window.alert(
          "Something went wrong. Please try again. Error - " + error
        );
      },
    }
  );

  return (
    <Formik
      initialValues={{username: "", password: ""}}
      onSubmit={(values) => login(values)}
      validationSchema={schema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        isSubmitting,
        errors,
        touched,
      }) => (
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{mt: 1}}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                autoComplete="email"
                autoFocus
                value={values.username}
                onChange={handleChange}
                error={!!touched.username && !!errors.username}
                helperText={!!touched.username && errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                error={!!touched.password && !!errors.password}
                helperText={!!touched.password && errors.password}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                disabled={isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                Sign In
              </Button>

              <Link
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => navigate("/register")}
                variant="body2"
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};
