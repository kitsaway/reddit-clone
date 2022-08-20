import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import { Container, TextField } from "@material-ui/core";
import { API, withSSRContext } from "aws-amplify";
import { GetStaticPaths, GetStaticProps } from "next";
import { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Comment,
  CreateCommentInput,
  CreateCommentMutation,
  DeleteCommentInput,
  GetPostQuery,
  ListPostsQuery,
  Post,
} from "../../src/API";
import Comments from "../../src/components/Comment/Comments";
import PostPreview from "../../src/components/Post/PostPreview";
import { useUser } from "../../src/context/AuthContext";
import { createComment, deleteComment } from "../../src/graphql/mutations";
import { getPost, listPosts } from "../../src/graphql/queries";
import useStyles from "../../styles/formStyles";

interface Props {
  post: Post;
}

interface IFormInputs {
  comment: string;
}

function IndividualPost({ post }: Props): ReactElement {
  const { cognitoUser } = useUser();
  const styles = useStyles();
  const [comments, setComments] = useState<Comment[]>(
    post.comments.items as Comment[]
  );
  const sortedByLatest = comments.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const createNewCommentInput: CreateCommentInput = {
      postID: post.id,
      content: data.comment,
    };

    const createNewComment = (await API.graphql({
      query: createComment,
      variables: { input: createNewCommentInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as { data: CreateCommentMutation };

    setComments([...comments, createNewComment.data.createComment as Comment]);
    reset();
  };

  const handleDelete = async (commentID: string) => {
    const deletePostCommentInput: DeleteCommentInput = {
      id: commentID,
    };
    API.graphql({
      query: deleteComment,
      variables: { input: deletePostCommentInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });

    setComments(comments.filter((c) => c.id !== commentID));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "5rem" }}>
      <PostPreview post={post} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.commentInput}>
        <TextField
          className={styles.muiInput}
          fullWidth
          variant="outlined"
          id="title"
          placeholder="Type something..."
          type="text"
          error={!!errors.comment}
          helperText={errors.comment ? errors.comment.message : null}
          {...register("comment", {
            minLength: {
              value: 1,
              message: "Please type a comment.",
            },
          })}
          disabled={!cognitoUser}
        />
        <input type="submit" hidden />
      </form>
      {sortedByLatest.map((comment) => (
        <Comments
          key={comment.id}
          comment={comment}
          handleDelete={handleDelete}
        />
      ))}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext();

  const postsQuery = (await SSR.API.graphql({
    query: getPost,
    variables: {
      id: params.id,
    },
  })) as { data: GetPostQuery; errors: any[] };

  if (!postsQuery.data.getPost) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: postsQuery.data.getPost,
    },

    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();

  const res = (await SSR.API.graphql({ query: listPosts })) as {
    data: ListPostsQuery;
    errors: any[];
  };
  const posts = res.data.listPosts.items;

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: "blocking" };
};

export default IndividualPost;
