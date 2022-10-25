const fetch = require("node-fetch");
const API_ENDPOINT = process.env.demo_endpoint;
exports.handler = async (event, context) => {
const root = 'shop';
const sfsqlReqPayload=`[
	{
		"query": {
			"sfsql": "SELECT $s:.${root}.supplier.name as name, $s:.${root}.supplier.id as id",
			"_q": "supp"
		}
	},
	{
		"query": {
			"sfsql": "SELECT $s:.${root}.product.code as code,$s:.${root}.product.name as name,$s:.${root}.product.image as image,$n:.${root}.product.price as price,$i:.${root}.product.totalordered as totordered,$s:.${root}.product.manufacturer.name as manname",
			"_q": "prod"
		}
	},
	{
		"query": {
			"sfsql": "SELECT $s:.${root}.customer.id as cusid,$s:.${root}.customer.first_name as fname,$s:.${root}.customer.last_name as lname,$s:.${root}.customer.email as email,$s:.${root}.customer.address.street as street,$s:.${root}.customer.address.city as city,$s:.${root}.customer.address.state as state,$s:.${root}.customer.address.zip as zip",
			"_q": "cust"
		}
	},
	{
		"query": {
			"sfsql": "SELECT $i:.${root}.order.order_id as orderid, $s:.${root}.order.lineitem.item.code as code,$s:.${root}.order.lineitem.item.name as name,$s:.${root}.order.lineitem.item.manufacturer.name as manname, $s:.${root}.order.lineitem.item.image as image, $i:.${root}.order.lineitem.no as no, $i:.${root}.order.lineitem.qty as quantity, $n:.${root}.order.lineitem.price as price, $s:.${root}.order.cust.id as cusid,$s:.${root}.order.cust.first_name as fname, $s:.${root}.order.cust.last_name as lname,$s:.${root}.order.cust.email as email,$s:.${root}.order.cust.address.street as street, $s:.${root}.order.cust.address.city as city, $s:.${root}.order.cust.address.state as state,  $s:.${root}.order.cust.address.zip as zip",
			"_q": "order"
		}
	}
]`;
	
  return fetch(API_ENDPOINT, {
	  headers: {
		   "content-type": "application/json",
         "x-sfsql-apikey": process.env.demo_api_key
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
