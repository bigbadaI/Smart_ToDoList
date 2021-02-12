'use strict';
const KGSearch = require('google-kgsearch');
const kGraph = KGSearch(process.env.APIGOOGLEKEY);
const yelp = require('yelp-fusion');
const { compareObj, queryMatch, yelpSearch } = require('../helpers/helpers');


/*
 * All routes for Tasks are defined here
 * Since this file is loaded in server.js into api/tasks,
 *   these routes are mounted onto /tasks
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const CLIENT = yelp.client(process.env.YELP_API_KEY);

module.exports = (db) => {
  router.get("/", (req, res) => {
    let currentUser = req.session.username || 0;
    let query = `SELECT * FROM tasks
    WHERE user_id = ${currentUser}
    AND complete = false`;
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

  //Adding new tasks to clients lists
  router.post("/", (req, res) => {


    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    // Console message for debugging once the form submission/Ajax request is functional
    console.log("-----------------");
    console.log("POST request to add new task");
    console.log("New Task:", req.body.text);
    console.log("User:", req.session.username);
    console.log("-----------------");

    let queryString = `INSERT INTO tasks (user_id, title, category, description, due_date, url) VALUES ( $1, $2, $3, $4, $5, $6)`;

    let userID = req.session.username;
    let title = req.body.text;
    let description = 'To Read';
    let dueDate = '2021-02-24';
    let url = "";
    let values = [userID, title, 'To Ponder', '', dueDate, ''];


    //used for our kGraph search
    let params = {
      query: title,
      limit: 2
    };

    //kGraph does a google search of the title we are wanting to add to our SmartToDos
    kGraph.search(params, (err, items) => {
      if (err) console.error(err);

      console.log(items);
      let test = [];

      for (let i = 0; i <= 1; i++) {
        if (items[i]) {
          // console.log("/////////////LOOK", items[i].result.name);
          // if (items[i].result.name === title) {
          test.push(...items[i].result['@type']);
          console.log("///",items[i].result['@type'],"////");

        }
      }


      values[2] = queryMatch(test, compareObj) || 'To Ponder';

      // Create values for Yelp Search API
      const searchRequest = {
        term: title,
        location: req.session.city,
      };

      console.log("======= HERE ========", test, values[2]);

      //If google search returns aren't sufficient use the Yelp Search
      if (values[2] === 'To Ponder') {
        // yelpSearch(CLIENT, searchRequest, values, title)
        yelpSearch(CLIENT, searchRequest, values, title)
          .then((response) => {

            //Insert new task in the db
            db.query(queryString, values)
              .then(() => {
                // Respond with a 201 (created) status on success
                res.status(201).send();
              })
              .catch(err => {
                res
                  .status(500)
                  .json({ error: err.message });
              });
          });

      } else {
        db.query(queryString, values)
          .then(() => {
            // Respond with a 201 (created) status on success
            res.status(201).send();
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      }
    });
  });


  //route to change complete boeloon to true
  router.post("/:id/complete/", (req, res) => {
    let taskid = req.params.id;
    let taskQuery = `UPDATE tasks
    SET complete = true
    WHERE id = ${taskid}`;
    db.query(taskQuery)
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

  return router;
};
