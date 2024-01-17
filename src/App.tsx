import { useQuery } from "react-query";

const wait = (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const getPosts = async () => {
  await wait(500);
  return fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((json) => json);
};

function App() {
  const query = useQuery("todos", getPosts);

  if (query.isLoading) {
    return <div>loading...</div>;
  }

  if (query.isError) {
    return <div>error...</div>;
  }

  return <pre>{JSON.stringify(query.data, null, 2)}</pre>;
}

export default App;
