import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ChatBubbleOutlineRounded,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import { API, Storage } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import useStyles from "./PostPreviewStyles";
import {
  CreateVoteInput,
  CreateVoteMutation,
  Post,
  UpdateVoteInput,
  UpdateVoteMutation,
} from "../../API";
import { createVote, updateVote } from "../../graphql/mutations";
import { useUser } from "../../context/AuthContext";

interface Props {
  post: Post;
}
function PostPreview({ post }: Props) {
  const router = useRouter();
  const styles = useStyles();
  const { cognitoUser } = useUser();
  const [postImage, setPostImage] = useState<string | undefined>(undefined);
  const [existingVote, setExistingvote] = useState<string | undefined>(
    undefined
  );
  const [existingVoteID, setExistingvoteID] = useState<string | undefined>(
    undefined
  );

  const [upvotes, setUpvotes] = useState<number>(
    post.votes.items
      ? post.votes.items.filter((v) => v.vote === "upvote").length
      : 0
  );
  const [downvotes, setDownvotes] = useState<number>(
    post.votes.items
      ? post.votes.items.filter((v) => v.vote === "downvote").length
      : 0
  );

  const getImage = async () => {
    try {
      const signedURL = await Storage.get(post.image);
      setPostImage(signedURL);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (cognitoUser) {
      const findVote = post.votes.items?.find(
        (v) => v.owner === cognitoUser.getUsername()
      );
      if (findVote) {
        setExistingvoteID(findVote.id);
        setExistingvote(findVote.vote);
      }
    }
  }, [cognitoUser]);

  useEffect(() => {
    getImage();
  }, []);

  const addVote = async (voteType: string) => {
    if (existingVote && existingVote !== voteType) {
      const updateVoteInput: UpdateVoteInput = {
        postID: post.id,
        vote: voteType,
        id: existingVoteID,
      };

      const updateExistingVote = (await API.graphql({
        query: updateVote,
        variables: { input: updateVoteInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: UpdateVoteMutation };

      if (voteType === "downvote") {
        setDownvotes(downvotes + 1);
      }

      if (voteType === "upvote") {
        setUpvotes(upvotes + 1);
      }
      setExistingvote(voteType);
      setExistingvoteID(updateExistingVote.data.updateVote.id);
    }

    if (!existingVote) {
      const createVoteInput: CreateVoteInput = {
        postID: post.id,
        vote: voteType,
      };

      const createNewVote = (await API.graphql({
        query: createVote,
        variables: { input: createVoteInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: CreateVoteMutation };

      if (createNewVote.data.createVote.vote === "downvote") {
        setDownvotes(downvotes + 1);
      }
      if (createNewVote.data.createVote.vote === "upvote") {
        setUpvotes(upvotes + 1);
      }
      setExistingvote(voteType);
      setExistingvoteID(createNewVote.data.createVote.id);
    }
  };

  return (
    <Grid
      container
      className={styles.content}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item className={styles.votesContainer}>
        <Grid container className={styles.voteButtons}>
          <Grid item>
            <IconButton
              style={{ padding: "0" }}
              onClick={() => addVote("upvote")}
            >
              <ThumbUpAltOutlined className={styles.voteIcon} />
            </IconButton>
          </Grid>
          <Grid item>{upvotes - downvotes}</Grid>
          <Grid item>
            <IconButton
              style={{ padding: "0" }}
              onClick={() => addVote("downvote")}
            >
              <ThumbDownAltOutlined className={styles.voteIcon} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={styles.contentGridItem}>
        <Card
          className={styles.contentContainer}
          onClick={() => router.push(`/post/${post.id}`)}
        >
          <CardHeader
            className={styles.headerStyle}
            avatar={<Avatar />}
            title={post.owner}
            subheader={new Date(post.createdAt).toLocaleString()}
          />
          <CardContent>
            <Typography variant="h3">{post.title}</Typography>
            <Typography variant="body2">{post.content}</Typography>
            {post.image && postImage && (
              <CardMedia
                component="img"
                height="auto"
                image={postImage}
                alt="Paella dish"
                style={{ margin: "1rem 0" }}
              />
            )}
          </CardContent>
          <CardActions>
            <IconButton aria-label="Comments" style={{ padding: "8px" }}>
              <ChatBubbleOutlineRounded
                style={{
                  color: "#9CA3AF",
                  fontSize: "18px",
                  marginRight: "0.3rem",
                }}
              />
              <Typography variant="body1" style={{ fontSize: "15px" }}>
                Comments
              </Typography>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PostPreview;
