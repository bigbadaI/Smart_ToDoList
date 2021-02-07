require('dotenv').config({path:__dirname+'/./../../.env'});
const KGSearch = require('google-kgsearch');
const kGraph = KGSearch(process.env.APIGOOGLEKEY);

let params = {
  query: process.argv.slice(2).join(" "),
  limit: 1
};

kGraph.search(params, (err, items) => {
  if (err) console.error(err);
  console.log(items);
  console.log(items[0].result['@type']);
  console.log(items[0].result.description);
});

