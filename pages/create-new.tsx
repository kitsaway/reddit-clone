import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { API, Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import ImageDropdown from "../src/components/DropDown";
import useStyles from "../styles/formStyles";
import { CreatePostInput, CreatePostMutation } from "../src/API";
import { createPost } from "../src/graphql/mutations";

interface IFormInputs {
  title: string;
  content: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function CreateNew() {
  const styles = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [file, setFile] = useState<File>();
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

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (file) {
      try {
        const imagePath = uuidv4();

        await Storage.put(imagePath + file.type, file);

        const createNewPostInput: CreatePostInput = {
          title: data.title,
          content: data.content,
          image: imagePath + file.type
        };
        const createNewPost = API.graphql({
          query: createPost,
          variables: { input: createNewPostInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        }) as CreatePostMutation;

        if (createNewPost) {
          setIsError(false);
          setSuccessMessage("Post successfully added");
          setOpen(true);
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }   
      } catch (error) {
        setIsError(true);
        setErrorMessage("Something went wrong...");
        setOpen(true);
      }
    } else {
        const createNewPostInput: CreatePostInput = {
          title: data.title,
          content: data.content,
        };
        const createNewPost = API.graphql({
          query: createPost,
          variables: { input: createNewPostInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        }) as CreatePostMutation;

        if (createNewPost) {
          setIsError(false);
          setSuccessMessage("Post successfully added");
          setOpen(true);
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }   
    }
  };
  return (
    <Container maxWidth="md" style={{ marginTop: "5rem" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          spacing={3}
          style={{
            background: "#1A1A1B",
            border: "1px solid #343536",
            borderRadius: "8px",
            padding: "2rem 0.5rem",
          }}
        >
          <Grid item>
            <TextField
              className={styles.muiInput}
              fullWidth
              variant="outlined"
              id="title"
              label="Title*"
              type="text"
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : null}
              {...register("title", {
                required: { value: true, message: "Post title is required" },
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              className={styles.muiInput}
              fullWidth
              multiline
              minRows={5}
              variant="outlined"
              id="content"
              label="Content*"
              type="text"
              error={!!errors.content}
              helperText={errors.content ? errors.content.message : null}
              {...register("content", {
                required: { value: true, message: "Post content is required" },
              })}
            />
          </Grid>
          <Grid item>
            <ImageDropdown file={file} setFile={setFile} />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" fullWidth>
              Create
            </Button>
          </Grid>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={isError ? "error" : "success"}
            >
              {isError ? errorMessage : successMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </form>
    </Container>
  );
}

export default CreateNew;
