import React, { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./CommentStyle";
import { Comment } from "../../API";
import { useUser } from "../../context/AuthContext";

interface Props {
  comment: Comment;
  handleDelete: Function;
}

function Comments({ comment, handleDelete }: Props) {
  const styles = useStyles();
  const { cognitoUser } = useUser();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const handleOpenSettings = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchor(null);
  };

  return (
    <Paper className={styles.contentContainer}>
      <Box className={styles.commentHeader}>
        <Avatar className={styles.commentOwnerAvatar} />
        <Typography variant="body2" className={styles.owner}>
          {comment.owner} <br /> {new Date(comment.createdAt).toLocaleString()}
        </Typography>
        {cognitoUser && (
          <>
            <IconButton
              className={styles.settings}
              onClick={handleOpenSettings}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="settings"
              style={{ top: "40px", right: "2rem" }}
              anchorEl={anchor}
              keepMounted
              open={Boolean(anchor)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem>
                  <Typography onClick={() => {handleDelete(comment.id)}} className={styles.listItem}>
                    Delete
                  </Typography>
                </MenuItem>
            </Menu>
          </>
        )}
      </Box>
      <Typography variant="body2" className={styles.content}>
        {comment.content}
      </Typography>
    </Paper>
  );
}

export default Comments;
