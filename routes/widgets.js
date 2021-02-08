/*
 * All routes for Tasks are defined here
 * Since this file is loaded in server.js into api/tasks,
 *   these routes are mounted onto /tasks
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let currentUser = req.session.username;
    let query = `SELECT * FROM tasks
    WHERE user_id = ${currentUser}`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    // Access from command line: curl -i -X POST localhost:8080/api/widgets

    // Console message for debugging once the form submission/Ajax request is functional
    console.log("-----------------");
    console.log("POST request to add new task");
    console.log(req.params);
    console.log("-----------------");

    let queryString = `INSERT INTO tasks (user_id, title, category, description, due_date) VALUES ( $1, $2, $3, $4, $5)`;
    // TODO: CHANGE OUT WITH REQ PARAMS ONCE CLIENT SIDE FORM SUBMISSION AJAX REQUEST IS FUNCTIONAL
    let userID = 4;
    let title = 'Harry Potter and the Prisoner of Azkaban';
    let category = 'Book';
    let description = 'To Read';
    let dueDate = '2021-02-24';
    let values = [userID, title, category, description, dueDate];


    db.query(queryString, values)
    .then(data => {
      // Respond with a 201 (created) status on success
      res.status(201).send();
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};
