
const KGSearch = require('google-kgsearch');
const kGraph = KGSearch(process.env.APIGOOGLEKEY);

/*
 * All routes for Tasks are defined here
 * Since this file is loaded in server.js into api/tasks,
 *   these routes are mounted onto /tasks
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let currentUser = req.session.username;
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



  router.post("/", (req, res) => {
    // Access from command line: curl -i -X POST localhost:8080/api/widgets

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

    let queryString = `INSERT INTO tasks (user_id, title, category, description, due_date) VALUES ( $1, $2, $3, $4, $5)`;
    // TODO: CHANGE OUT WITH REQ PARAMS ONCE CLIENT SIDE FORM SUBMISSION AJAX REQUEST IS FUNCTIONAL
    let userID = req.session.username;
    let title = req.body.text;
    let category = 'Book';
    let description = 'To Read';
    let dueDate = '2021-02-24';
    let values = [userID, title, category, description, dueDate];

    let params = {
      query: title,
      limit: 1
    };
    kGraph.search(params, (err, items) => {
      let test = items[0].result['@type'];
      let types = 'Thing';

      //building an object to compare types to categories
      let compareObj = {
        'To Watch': ['Movie', 'TVSeries'],
        'Listen To': ['Compsition', 'MusicGroup', 'BroadcastService', 'RadioSeries', 'RadioStation'],
        'To Read': ['Book', 'ComicBook'],
        'Places To Visit': ['Place', 'Restaurant', 'Place', 'TouristAttraction'],
        'Would Like To Play': ['Game', 'VideoGame'],

      }

      const findCommonElements = function (arr1, arr2) {
        return arr1.some(item => arr2.includes(item))
    }

      for (let category in compareObj){
        let match = findCommonElements(compareObj[category], items[0].result['@type'] )
        if (match) {
          values[2] = category;
          break;
        }

      }

      if (err) console.error(err);
      // test.forEach(element => {
      //   if (element !== 'Thing') {
      //     types = element;
      //   }
      //   values[2] += types + " ";
      // });

      console.log(items[0].result['@type']);
      console.log(items[0].result.description);
      // values[2] = test[1];
      // }
      (db.query(queryString, values)
        .then(() => {
          // Respond with a 201 (created) status on success
          res.status(201).send();
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        }));

    });

  });
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
