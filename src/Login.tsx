import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (): Promise<{ token: string }> => {
    const response = await fetch("http://0.0.0.0:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();
    if (![200, 201].includes(response.status)) {
      throw new Error(json.error);
    }
    return json;
  };

  const mutation = useMutation(login, {
    onSuccess: (data: { token: string }) => {
      window.localStorage.setItem("token", data.token);
      navigate("/posts");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        autoComplete="off"
        component="form"
        noValidate
        sx={{ display: "flex", flexFlow: "column" }}
        onSubmit={(event) => {
          event.preventDefault();

          mutation.mutate();
        }}
      >
        <TextField
          id="username"
          label="username"
          variant="standard"
          placeholder="username"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
        ></TextField>
        <TextField
          id="password"
          label="password"
          type="password"
          variant="standard"
          placeholder="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        ></TextField>
        <Button type="submit">Submit</Button>
        {mutation.isError && (
          <Typography>{(mutation.error as Error).message}</Typography>
        )}
      </Box>
    </Box>
  );
};
