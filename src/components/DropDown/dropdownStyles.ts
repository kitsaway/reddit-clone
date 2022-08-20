import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles({
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "16px",
  },
  thumb: {
    display: "inline-flex",
    borderRadius: "2px",
    border: "1px solid #eaeaea",
    marginBottom: "8px",
    marginRight: "8px",
    width: "100px",
    height: "100px",
    padding: "4px",
    boxSizing: "border-box",
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  },
  img: {
    display: "block",
    maxWidth: "500px",
    height: "auto",
      margin: "0 auto",
    borderRadius: '5px',
    [theme.breakpoints.down("xs")]: {
      minWidth: "90%",
      maxWidth: "90%",
    },
  },
  fileRemove: {
    position: "absolute",
    top: "0",
    right: "2rem",
    color: "#FF585B",
  },
});

export default useStyles;
