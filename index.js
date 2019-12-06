const express = require("express");

const server = express();
const port = 4000;

const projectsRouter = require("./routes/projectsRouter");
const actionsRouter = require("./routes/actionsRouter");

server.use(express.json());

server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
