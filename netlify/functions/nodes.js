const fetch = require("node-fetch");
const API_ENDPOINT = process.env.endpoint;

exports.handler = async (event, context) => {

        const sfsqlReqPayload=`[
												{
													"query": {
														"sfsql": "SELECT $s:.Node.id as id, $s:.Node.label as label where  $s:.Node.type='character'"
													},
													"_comment": "nodes"
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
		  const nodes = data[0]['data'];
		  
		  let str1 = '['; 

			let i = 0;
			while (i < nodes.length) {

			  str1 += `{
					"data":{
						"id":"${nodes[i]['id']}",
						"label":"${nodes[i]['label']}" 
						}
						 },`
			  i++;

			}
	
		   let newstr1 = str1.slice(0, -1);
		       newstr1 += ']';
		  return {
				statusCode: 200,
				body: newstr1,
			 }; 
		
};	 
