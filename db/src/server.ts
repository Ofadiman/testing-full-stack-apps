import * as jsonServer from "json-server";

const user = {
  username: "ofadiman",
  password: "pass1",
  token: "d7720048-d6a0-4a6e-a32f-3900e266be9a",
};

const server = jsonServer.create();

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  console.log(`req.path: ${req.path}`);
  if (req.path.startsWith("/health") || req.path.startsWith("/login")) {
    next();
    return;
  }

  if (req.headers.authorization === user.token) {
    next();
    return;
  }

  res.status(401);
  res.send({ error: "unauthorized" });
});

server.get("/health", (_req, res) => {
  res.jsonp({ status: "ok" });
});

server.post("/login", (req, res) => {
  if (
    req.body.username === user.username &&
    req.body.password === user.password
  ) {
    res.jsonp({ token: user.token });
    return;
  }

  res.status(401);
  res.send({ error: "unauthorized" });
});

server.use(jsonServer.router("db.json"));

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON server is listening on port ${PORT}`);
});
