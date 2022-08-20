import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Container, Typography } from "@material-ui/core";
import { listPosts } from "../src/graphql/queries";
import PostPreview from "../src/components/Post/PostPreview";
import { ListPostsQuery, Post } from "../src/API";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchDataFromApi = async () => {
    const allPosts = (await API.graphql({ query: listPosts })) as {
      data: ListPostsQuery;
      errors: any[];
    };
    if (allPosts.data) {
      setPosts(allPosts.data.listPosts.items);
    } else {
      throw new Error("Couldn't get posts");
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);
  
  return (
    <Container maxWidth="md" style={{ marginTop: '5rem', marginBottom: '5rem'}}>
      {posts && posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
      {posts.length === 0 && <Typography variant="body1" style={{ color: '#818384', textAlign: 'center', }}>No posts yet</Typography>}
    </Container>
  );
}
