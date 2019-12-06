const express = require("express");
const router = express.Router();
const actionModel = require("../data/helpers/actionModel");
const projectModel = require("../data/helpers/projectModel");

//Get all actions
router.get("/", (req, res) => {
  actionModel
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log("Error getting all actions", err);
      res.status(500).json({ error: "Could not get all actions" });
    });
});

//Get actions by id
router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.put("/:id", validateActionId, (req, res) => {
  actionModel
    .update(req.params.id, req.body)
    .then(updatedRecord => {
      console.log("Updated record: ", updatedRecord);
      res.status(200).json(updatedRecord);
    })
    .catch(err => {
      console.log("Error trying to update action", err);
      res.status(500).json({ error: "Could not update action" });
    });
});

//Make new action
router.post("/", validateProjectId, (req, res) => {
  const body = req.body;
  if (!body.description || !body.notes) {
    res
      .status(400)
      .json({ error: "description and notes fields are required" });
  } else {
    //Check description length to not exceed 128 characters
    if (body.description.length > 128) {
      res
        .status(400)
        .json({ error: "description length cannot exceed 128 characters" });
    } else {
      actionModel
        .insert(body)
        .then(newAction => {
          res.status(201).json(newAction);
        })
        .catch(err => {
          console.log("Error making new action", err);
          res.status(500).json({ error: "Could not make new action" });
        });
    }
  }
});

function validateActionId(req, res, next) {
  const id = req.params.id;
  actionModel
    .get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ error: "Could not find action by that id" });
      }
    })
    .catch(err => {
      console.log("Error verifying action by id", err);
      res.status(500).json({ error: "Could not verify project by id" });
    });
}

function validateProjectId(req, res, next) {
  if (req.body.project_id) {
    projectModel
      .get(req.body.project_id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({ error: "Could not find project by that id" });
        }
      })
      .catch(err => {
        console.log("Error verifying project by id", err);
        res
          .status(500)
          .json({ error: "There was an error verifying project by id" });
      });
  } else {
    res.status(400).json({ error: "project_id field is required" });
  }
}

module.exports = router;
