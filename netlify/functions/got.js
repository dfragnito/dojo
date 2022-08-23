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
		  //var data = JSON.parse(data)
		  
		  let str1 = '' 

			let i = 0;
			while (i < data[0]["data"].length) {

			  str1 += `{
					"data":{
						"id":"${data[0]['data'][i]['id']}",
						"label":"${data[0]['data'][i]['label']}" 
						}
						 },`
			  i++;

			}

			//let newstr1 = str1.slice(0, -1);
			 
			let str2 = ''
			let j = 0;
			while (j < data[1]["data"].length) {

			  str2 += `{
					"data":{
						"id":"${data[1]['data'][j]['id']}",
						"source":"${data[1]['data'][j]['source']}",
						"target":"${data[1]['data'][j]['target']}"			
						}
						 },`
			  i++;

			}

         let newstr2 = str2.slice(0, -1);
		 
	
		 
      statusCode: 200,
      body:JSON.stringify(newstr2),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};	 
