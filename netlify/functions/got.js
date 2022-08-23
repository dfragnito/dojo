const fetch = require("node-fetch");
const API_ENDPOINT = process.env.endpoint;

exports.handler = async (event, context) => {

const sfsqlReqPayload=`[
	{
		"query": {
			"sfsql": "SELECT $s:.Node.id as id, $s:.Node.label as label where  $s:.Node.type='character'"
		},
		"_comment": "nodes"
	},
	{
		"query": {
			"sfsql": "SELECT $o:.Node.edge.oid() as id, $s:.Node.id as source, $s:.Node.edge.Connection.id as target where $s:.Node.edge.Connection.type='character'"
		},
		"_comment": "edges"
	}
]`;
	
  return fetch(API_ENDPOINT, {
	  headers: {
		   "content-type": "application/json",
         "x-sfsql-apikey": process.env.api_key
		  }, 
		  method: "POST",
        body: sfsqlReqPayload,
	  })
    .then((response) => response.json())
    .then((data) => ({
		  
		  
      statusCode: 200,
      body:JSON.stringify(data),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};	 
