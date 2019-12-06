const express = require("express");

const projectModel = require("../data/helpers/projectModel");

const router = express.Router();

//Get all projects
router.get("/", (req, res) => {
  projectModel
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log("Error trying to get all projects", err);
      res.status(500).json({ error: "Could not get projects" });
    });
});

//Get project by id.
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

//Create a new project
router.post("/", (req, res) => {
  const body = req.body;
  if (!body.name || !body.description) {
    res.status(400).json({ error: "name and description fields are required" });
  } else {
    projectModel
      .insert(body)
      .then(newProject => {
        res.status(201).json(newProject);
      })
      .catch(err => {
        console.log("Error creating new project", err);
        res.status(500).json({ error: "Could not create project" });
      });
  }
});

//Edit project by id
router.put("/:id", validateProjectId, (req, res) => {
  projectModel
    .update(req.params.id, req.body)
    .then(updatedRecord => {
      res.status(200).json({ updatedRecord });
    })
    .catch(err => {
      console.log("Error, could not update project", err);
      res.status(500).json({ error: "Could not update project" });
    });
});

//Delete project by id
router.delete("/:id", validateProjectId, (req, res) => {
  projectModel
    .remove(req.params.id)
    .then(recordsDeleted => {
      res.status(200).json({ recordsDeleted });
    })
    .catch(err => {
      console.log("Error trying to remove project", err);
      res.status(500).json({ err: "Could not remove project" });
    });
});

function validateProjectId(req, res, next) {
  const id = req.params.id;
  projectModel
    .get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ error: "Could not find project with that id" });
      }
    })
    .catch(err => {
      console.log("Error trying to verify project by id", err);
      res.status(500).json({ error: "Could not verify project by id" });
    });
}

module.exports = router;
