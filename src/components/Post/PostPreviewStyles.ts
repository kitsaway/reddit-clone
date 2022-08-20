import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles({
  content: {
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      margin: "0 auto",
      marginBottom: "1rem",
    },
  },
  contentGridItem: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  headerStyle: {
    "& .MuiTypography-colorTextSecondary": {
      color: "#9CA3AF",
    },
  },
  votesContainer: {
    width: "60px",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
    },
  },
  voteButtons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100px",
      marginLeft: "8px",
      marginTop: "8px",
    },
  },
  voteIcon: {
    display: "flex",
    color: "#9CA3AF",
  },
  contentContainer: {
    width: "780px",
    padding: "5px auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  settings: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: "5px 0",
    color: "#9CA3AF",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "0",
    fontSize: "14px",
    color: "#D7DADC",
  },
});

export default useStyles;
