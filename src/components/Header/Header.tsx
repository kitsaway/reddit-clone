import React, { useState } from "react";
import {
  AppBar,
  Box,
  ButtonBase,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import useStyles from "./HeaderStyles";
import { useUser } from "../../context/AuthContext";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function AppHeader() {
  const styles = useStyles();
  const router = useRouter();
  const { cognitoUser } = useUser();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [signOutError, setSignOutError] = useState<string>("");
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      setSignOutError(error.message);
    }
  };

  const handleAddPost = () => {
    router.push("/create-new");
  };

  const menu = [
    {
      id: "create-new",
      name: "Create new post",
      icon: <AddRoundedIcon style={{ paddingRight: "5px" }} />,
      handle: handleAddPost,
    },
    {
      id: "log-out",
      name: "Logout",
      icon: <AccountCircleOutlinedIcon style={{ paddingRight: "5px" }} />,
      handle: handleLogout,
    },
  ];
  return (
    <AppBar position="fixed" className={styles.appBarContainer}>
      <Container maxWidth={false}>
        <Toolbar className={styles.appBar}>
          <Box onClick={() => router.push("/")} className={styles.logo} />
          {cognitoUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  className={styles.iconButton}
                >
                  <PermIdentityIcon style={{ color: "", fontSize: "25px" }} />
                  <ExpandMoreIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                style={{ top: "28px", right: "2rem" }}
                anchorEl={anchorElUser}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {menu.map((item) => (
                  <MenuItem key={item.id}>
                    <Typography
                      onClick={item.handle}
                      className={styles.listItem}
                    >
                      {item.icon}
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {!cognitoUser && (
            <ButtonBase className={styles.loginButton} href="/signin">
              Sign In
            </ButtonBase>
          )}
        </Toolbar>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {signOutError}
        </Alert>
      </Snackbar>
    </AppBar>
  );
}
export default AppHeader;
