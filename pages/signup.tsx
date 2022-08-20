import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Snackbar,
  Typography,
  Link
} from "@material-ui/core";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import useStyles from "../styles/formStyles";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  code: string;
}

export default function Signup() {
  const styles = useStyles();
  const [showCode, setShowCode] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [signUpMessage, setSignUpMessage] = useState<string>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function signUpAuth(data: IFormInputs): Promise<CognitoUser> {
    const { username, email, password } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function confirmSignUp(data: IFormInputs) {
    const { username, password, code } = data;
    try {
      await Auth.confirmSignUp(username, code);
      const amplifyUser = await Auth.signIn(username, password);
      return amplifyUser;
    } catch (error) {
      setIsError(true);
      setSignUpMessage(error.message);
      setOpen(true);
    }
  }

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (showCode) {
      confirmSignUp(data);
      setIsError(false);
      setSignUpMessage("Successfully signed up!");
      setOpen(true);
    } else {
      await signUpAuth(data);
      setShowCode(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={4}
        className={styles.formContainer}
      >
        <Grid item>
          <Typography variant="h1">Sign Up</Typography>
        </Grid>
        <Grid item>
          <TextField
            className={styles.muiInput}
            variant="outlined"
            id="username"
            label="Username"
            type="text"
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : null}
            {...register("username", {
              required: { value: true, message: "Please enter a username." },
              minLength: {
                value: 3,
                message: "Please enter a username between 3-16 charachters.",
              },
              maxLength: {
                value: 16,
                message: "Please enter a username between 3-16 charachters.",
              },
            })}
          />
        </Grid>
        <Grid item>
          <TextField
            className={styles.muiInput}
            variant="outlined"
            id="email"
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : null}
            {...register("email", {
              required: { value: true, message: "Please enter an email." },
            })}
          />
        </Grid>
        <Grid item>
          <TextField
            className={styles.muiInput}
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : null}
            {...register("password", {
              required: { value: true, message: "Please enter a password." },
              minLength: {
                value: 8,
                message:
                  "Please enter password that is min. 8 charachters long.",
              },
            })}
          />
        </Grid>
        {showCode && (
          <Grid item>
            <TextField
              className={styles.muiInput}
              variant="outlined"
              id="code"
              label="Verification code"
              type="text"
              error={!!errors.code}
              helperText={errors.code ? errors.code.message : null}
              {...register("code", {
                required: {
                  value: true,
                  message: "Please enter verification code sent to your email.",
                },
              })}
            />
          </Grid>
        )}
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: "10rem", backgroundColor: "#D7DADC", borderRadius: '20px' }}
          >
            {showCode ? "Confirm code" : "Sign Up"}
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="body1" className={styles.helperText}>
            Already have an account? <Link href="/signin">Sign In</Link>
          </Typography>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity={isError ? "error" : "success"}>
            {signUpMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </form>
  );
}
