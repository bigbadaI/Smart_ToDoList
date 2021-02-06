// Uses a google api (https://developers.google.com/knowledge-graph) to fetch the results of user input for auto-categorization
// API key is an environment variable


// TODO: Set as a form on submit function once set up

const GOOGLE_URL = 'https://kgsearch.googleapis.com/v1/entities:search';
// get user input of the task title for the query
// TODO: change from CLI to form input once set up
const key = process.argv[2];
const query = process.argv.slice(3).join(" ");

const params = {
  query,
  'limit': 10,
  'indent': true,
  key
};

console.log(params);

// $.getJSON(GOOGLE_URL + '?callback=?', params, function(response) {
//   console.log("Starting the google request...");

//   $.each(response.itemListElement, function(i, element) {
//     console.log("Starting the loop through results...");

//     // TODO: Use to create HTML element (auto-category) from user input once set up
//     // $('<div>', {text:element['result']['name']}).appendTo(document.body);

//     if (element['result']['name'].toUppercase === params.query.toUppercase) {
//       console.log("MATCH!");
//       console.log(element['result']);
//       // console.log(Object.keys(element['result']));
//       element['result']['@type'].forEach(type => {
//         console.log(params.query, "is a/an:", type);
//       });
//     }
//   });
// });
