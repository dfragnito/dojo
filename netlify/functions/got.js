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
		  const nodes = data[0]['data']
		  return {
				statusCode: 200,
				body: JSON.stringify(nodes),
			 }; 
		
};	 
