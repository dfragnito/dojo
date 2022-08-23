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
		  //const nodes = data[0]['data'];
		  
		  let str1 = ''; 

			let i = 0;
			while (i < data[0]['data'].length) {

			  str1 += `{
					"data":{
						"id":"${data[0]['data'][i]["id"]}",
						"label":"${data[0]['data'][i]['label']}" 
						}
						 },`
			  i++;

			} 

			let str2 = ''; 
			 
			let j = 0;
			while (j < data[1]['data'].length) {

			  str2 += `{
					"data":{
						"id":"${data[1]['data'][j]['id']}",
						"source":"${data[1]['data'][j]['source']}",
                  "target":"${data[1]['data'][j]['target']}" 						
						}
						 },`
			  i++;

			}

			const newstr2 = str2.slice(0, -1);
			
			//const str3 = str1.concat(newstr2);
		  
		  
		  
		  
		  return {
				statusCode: 200,
				body: JSON.stringify(newstr2),
			 }; 
		
};	 
