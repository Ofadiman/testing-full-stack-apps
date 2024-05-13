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

const getPosts = async (): Promise<Post[]> => {
  const response = await fetch("http://0.0.0.0:3000/posts", {
    headers: {
      Authorization: window.localStorage.getItem("token")!,
    },
  });

  if (!response.ok) {
    throw new Error("error from getPosts");
  }

  return response.json();
};

export function Posts() {
  const query = useQuery({
    queryFn: getPosts,
    queryKey: ["posts"],
    retry: false,
    onError: () => {
      console.error(`error occured`);
    },
  });

  if (query.isLoading) {
    return <div>loading...</div>;
  }

  if (query.isError) {
    return <div>error...</div>;
  }

  return (
    <Grid container spacing={2} padding={2} disableEqualOverflow>
      {query.data === undefined
        ? "Data not available"
        : query.data.map((post) => {
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
