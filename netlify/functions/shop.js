const fetch = require("node-fetch");
const API_ENDPOINT = process.env.endpoint;

exports.handler = async (event, context) => {
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const root = 'ntshop' + randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');	
const sfsqlReqPayload=`[
	{
		"modify": {
			"data": {
				"shops": {
					"${root}": {
						"supplier": {
							"name": "Sony Group Corporation",
							"id": "sony"
						},
						"product": [
							{
								"name": "FinePix Pro2 3D Camera",
								"code": "3DcAM01",
								"image": "camera.jpg",
								"n:price": 300.0,
								"i:totalordered": 0,
								"manufacturer": {
									"#ref": "SELECT $o:.${root}.supplier.oid() WHERE $s:.${root}.supplier.id='sony'"
								}
							},
							{
								"name": "EXP Portable Hard Drive",
								"code": "USB02",
								"image": "external-hard-drive.jpg",
								"n:price": 800.0,
								"i:totalordered": 0,
								"manufacturer": {
									"#ref": "SELECT $o:.${root}.supplier.oid() WHERE $s:.${root}.supplier.id='sony'"
								}
							},
							{
								"name": "Luxury Ultra thin Wrist Watch",
								"code": "wristWear03",
								"image": "watch.jpg",
								"n:price": 100.0,
								"i:totalordered": 0,
								"manufacturer": {
									"name": "TAG Heuer",
									"id": "tag"
								}
							},
							{
								"name": "XP 1155 Intel Core Laptop",
								"code": "LPN45",
								"image": "laptop.jpg",
								"n:price": 250.0,
								"i:totalordered": 0,
								"manufacturer": {
									"name": "DELL Inc",
									"id": "dell"
								}
							}
						],
						"o:supplier": [
							{
								"#append": {}
							},
							{
								"#ref": "SELECT $o:.${root}.product.manufacturer.oid() WHERE $s:.${root}.product.manufacturer.id='tag'"
							},
							{
								"#ref": "SELECT $o:.${root}.product.manufacturer.oid() WHERE $s:.${root}.product.manufacturer.id='dell'"
							}
						],
						"customer": {
							"#set": {
								"where": "$s:customer.id='c1111'"
							},
							"s:id": "c1111",
							"s:first_name": "Larry",
							"s:last_name": "Smith",
							"o:address": {
								"street": "5 Elmwood Avenue",
								"city": "Rochester",
								"state": "NY",
								"zip": "14616"
							}
						},
						"o:order": [
							{
								"#append": {}
							},
							{
								"i:order_id": 1,
								"d:datetime": "now",
								"o:cust": {
									"#ref": "SELECT $o:.${root}.customer.oid() WHERE $s:.${root}.customer.id='c1111'",
									"email": "support@schemafreesql.com"
								},
								"o:lineitem": [
									{
										"o:item": {
											"#ref": "SELECT $o:.${root}.product.oid() WHERE $s:.${root}.product.code='3DcAM01'",
											"i:totalordered": {
												"#pass": "v + 1"
											}
										},
										"i:no": 1,
										"i:qty": 1,
										"n:price": 300.0
									},
									{
										"o:item": {
											"#ref": "SELECT $o:.${root}.product.oid() WHERE $s:.${root}.product.code='wristWear03'",
											"i:totalordered": {
												"#pass": "v + 2"
											}
										},
										"i:no": 2,
										"i:qty": 2,
										"n:price": 100.0
									}
								]
							},
							{
								"i:order_id": 2,
								"d:datetime": "now",
								"o:cust": {
									"s:id": "c2222",
									"s:first_name": "Sally",
									"s:last_name": "Swanson",
									"email": "feedback@schemafreesql.com",
									"o:address": {
										"street": "7 Broadway",
										"city": "New York",
										"state": "NY",
										"zip": "10003"
									}
								},
								"o:lineitem": [
									{
										"o:item": {
											"#ref": "SELECT $o:.${root}.product.oid() WHERE $s:.${root}.product.code='LPN45'",
											"i:totalordered": {
												"#pass": "v + 2"
											}
										},
										"i:no": 1,
										"i:qty": 2,
										"n:price": 250.0
									}
								]
							}
						],
						"o:customer": [
							{
								"#append": {}
							},
							{
								"#ref": "SELECT $o:.${root}.order.cust.oid() WHERE $s:.${root}.order.cust.id='c2222'"
							}
						]
					}
				}
			}
		}
	},
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
