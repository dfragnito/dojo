const fetch = require("node-fetch");
const API_ENDPOINT = process.env.endpoint;

exports.handler = async (event, context) => {

        const sfsqlReqPayload=`[
												{
													"query": {
														"sfsql": "SELECT $o:.Node.edge.oid() as id, $s:.Node.id as source, $s:.Node.edge.Connection.id as target where $s:.Node.edge.Connection.type='character'"
													},
													"_comment": "edges"
												}
											]`
        const body = sfsqlReqPayload
        const init = {
          body: body,
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'x-sfsql-apikey': process.env.api_key
          },
        };
        const response = await fetch(API_ENDPOINT, init);
        const data =  await response.json();
		  const edges = data[0]['data'];

		  let str1 = '['; 

			let i = 0;
			
			while (i < edges.length) {

			  str1 += `{
					"data":{
						"id":"${edges[i]['id']}",
						"source":"${edges[i]['source']}",
						"target":"${edges[i]['target']}" 
						}
						 },`
			  i++;

			}
	
		  const newstr1 = str1.slice(0, -1);
		  const newstr1 += ']';
		  return {
				statusCode: 200,
				body: newstr1,
			 }; 
		
};	 
