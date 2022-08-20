import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles({
  appBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "49px",
    padding: "0",
  },
  appBarContainer: {
    height: "49px",
    "&.MuiAppBar-colorPrimary": {
      background: "#1A1A1B",
    },
    borderBottom: "1px solid #343536",
  },
  loginButton: {
    padding: "5px 13px",
    fontSize: "0.9rem",
    fontWeight: 600,
    background: "#D7DADC",
    borderRadius: "9999px",
    color: "#1A1A1B",
  },
  logo: {
    minWidth: "110px",
    minHeight: "45px",
    background: 'url("/RedditLogo.png") no-repeat center',
    backgroundSize: "contain",
    [theme.breakpoints.down("sm")]: {
      minWidth: "35px",
      minHeight: "35px",
      background: 'url("/Reddit-Icon.png") no-repeat center',
      backgroundSize: "contain",
    },
  },
  iconButton: {
    border: "1px solid #343536",
    borderRadius: "5px",
    color: "#818384",
    fontWeight: 200,
    padding: "2px",
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    fontSize: '14px',
    color: "#D7DADC"
  }
});

export default useStyles;
