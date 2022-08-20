import { makeStyles } from "@material-ui/core";
import theme from "../src/theme";

const useStyles = makeStyles({
  form: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10rem auto",
    padding: "1rem 0",
  },
  formContainer: {
    minWidth: "600px",
    maxWidth: "600px",
    backgroundColor: "#1A1A1B",
    border: "1px solid #343536",
    padding: "3rem 0",
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
      maxWidth: "100%",
    },
  },
  muiInput: {
    width: "100%",
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: "#818384",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#343536",
      },
    },
  },
  helperText: {
    fontSize: "14px",
    textAlign: "right",
    marginTop: "0.8rem",
  },
  commentInput: {
    background: "#1A1A1B",
    border: "1px solid #343536",
    borderRadius: "4px",
    maxWidth: "780px",
    marginLeft: "60px",
    marginTop: "-10px",
    marginBottom: "1rem",
    "& .MuiOutlinedInput-input": {
      padding: "10px 15px",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
      maxWidth: "100%",
      margin: "0 auto",
      marginTop: "-10px",
      marginBottom: "1rem",
    },
  },
});

export default useStyles;
