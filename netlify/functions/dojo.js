const html = GQLResult => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>LOW CODE SFSQL SHOP</title>
</head>
<body>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 15px;
}
</style>
<pre id="whereToPrint"></pre>
<div id="examplewrap"></div>
  <script>
    var results = \`${GQLResult}\`
    var obj = JSON.parse(results);
    console.log(result)
  </script>
 </body>
	 </html>`;
	 
const fetch = require("node-fetch");
const API_ENDPOINT = process.env.endpoint;

exports.handler = async (event, context) => {

const gqlquery = `query {
  tournament(slug: "def-s-dojo-winter-chronicle-2023") {
    id
    name
    events {
      id
      name
      competitionTier
      numEntrants
      slug
      standings(query: {
      page: 1,
      perPage: 100
      })
      {
      nodes {
        placement
        entrant {
          id
          name
          initialSeedNum
        }
      }
    }       
    }
  }
}`;
	
	
  return fetch(API_ENDPOINT, {
	  headers: {
         "content-type": "application/json",
         "Authorization": process.env.api_key
		  }, 
		  method: "POST",
        body: JSON.stringify({query:'gqlquery'}),
	  })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: html(JSON.stringify(data)), 
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
