import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Snackbar,
  Typography,
  Link,
} from "@material-ui/core";
import { Auth } from "aws-amplify";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useRouter } from "next/router";
import useStyles from "../styles/formStyles";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

interface IFormInputs {
  username: string;
  password: string;
}

export default function Signup() {
  const styles = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [signInError, setSignInError] = useState<string>("");

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

  async function signIn(data: IFormInputs) {
    try {
      const { username, password } = data;
      const amplifyUser = await Auth.signIn(username, password);
      if (amplifyUser) {
        router.push("/");
      }
    } catch (err) {
      setSignInError(err.message);
      setOpen(true);
    }
  }

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setOpen(false);
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={3}
        className={styles.formContainer}
      >
        <Grid item>
          <Typography variant="h1">Sign In</Typography>
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
              required: { value: true, message: "Username is required." },
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
              required: { value: true, message: "Password is required." },
            })}
          />
        </Grid>

        <Grid item>
          <Button
            type="submit"
            variant="contained"
            style={{
              marginLeft: "10rem",
              backgroundColor: "#D7DADC",
              borderRadius: "20px",
            }}
          >
            Sign In
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="body1" className={styles.helperText}>
            New to Reddit? <Link href="/signup">Sign Up</Link>
          </Typography>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            {signInError}
          </Alert>
        </Snackbar>
      </Grid>
    </form>
  );
}
