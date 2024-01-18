import {
  Card,
  Unstable_Grid2 as Grid,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useQuery } from "react-query";

type Post = {
  id: string;
  content: string;
  title: string;
  likes: number;
};

const wait = (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const getPosts = async (): Promise<Post[]> => {
  await wait(500);
  const response = await fetch("http://0.0.0.0:3000/posts", {
    headers: {
      Authorization: "d7720048-d6a0-4a6e-a32f-3900e266be9a",
    },
  });
  const json = await response.json();
  if (![200, 201].includes(response.status)) {
    throw new Error(json);
  }

  return json;
};

export function Posts() {
  const query = useQuery("todos", getPosts);

  if (query.isLoading) {
    return <div>loading...</div>;
  }

  if (query.isError || query.data === undefined) {
    return <div>error...</div>;
  }

  return (
    <Grid container spacing={2} padding={2} disableEqualOverflow>
      {query.data.map((post) => {
        return (
          <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={post.id}>
            <Card sx={{ height: "100%" }} data-cy={"card"}>
              <CardHeader title={post.title}></CardHeader>
              <CardContent>{post.content}</CardContent>
              <CardActions>Likes: {post.likes}</CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
