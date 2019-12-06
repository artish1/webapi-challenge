const express = require("express");

const server = express();
const port = 4000;

const projectsRouter = require("./routes/projectsRouter");

server.use("/projects", projectsRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
