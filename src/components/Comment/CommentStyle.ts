import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles({
  contentContainer: {
    width: "780px",
    padding: "12px 15px",
    marginLeft: "60px",
    marginTop: "5px",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
    },
  },
  commentOwnerAvatar: {
    width: "25px",
    height: "25px",
  },
  commentHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: 'relative',
  },
  settings: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: "5px 0",
    color: "#9CA3AF",
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    fontSize: '14px',
    color: "#D7DADC"
  },
  content: {
    marginTop: "1rem",
  },
  owner: {
    fontSize: "15px",
    padding: "0 10px",
  },
  createdAt: {
    fontSize: "12px",
  },
});

export default useStyles;
