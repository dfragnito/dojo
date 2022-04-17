function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const root = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
	 
const sfsqlReqPayload = `[{"delete":{"objfilter":"SELECT $o:${root}.attrset('delete')"}},{"purge":{}},{"modify":{"data":{"${root}":{"SHOP":{"INV":{"supplier${root}":{"name":"Sony Group Corporation","id":"sony"},"product${root}":[{"name":"FinePix Pro2 3D Camera","code":"3DcAM01","image":"camera.jpg","n:price":300.0,"i:totalordered":0,"manufacturer${root}":{"#ref":"SELECT $o:.supplier${root}.oid() WHERE $s:.supplier${root}.id='sony'"}},{"name":"EXP Portable Hard Drive","code":"USB02","image":"external-hard-drive.jpg","n:price":800.0,"i:totalordered":0,"manufacturer${root}":{"#ref":"SELECT $o:.supplier${root}.oid() WHERE $s:.supplier${root}.id='sony'"}},{"name":"Luxury Ultra thin Wrist Watch","code":"wristWear03","image":"watch.jpg","n:price":100.0,"i:totalordered":0,"manufacturer${root}":{"name":"TAG Heuer","id":"tag"}},{"name":"XP 1155 Intel Core Laptop","code":"LPN45","image":"laptop.jpg","n:price":250.0,"i:totalordered":0,"manufacturer${root}":{"name":"DELL Inc","id":"dell"}}],"o:supplier${root}":[{"#append":{}},{"#ref":"SELECT $o:.manufacturer${root}.oid() WHERE $s:.manufacturer${root}.id='tag'"},{"#ref":"SELECT $o:.manufacturer${root}.oid() WHERE $s:.manufacturer${root}.id='dell'"}]},"customer${root}":{"#set":{"where":"$s:customer${root}.id='c1111'"},"s:id":"c1111","s:first_name":"Larry","s:last_name":"Smith","o:address":{"street":"5 Elmwood Avenue","city":"Rochester","state":"NY","zip":"14616"}},"o:order${root}":[{"#append":{}},{"i:order_id":1,"d:datetime":"now","o:cust${root}":{"#ref":"SELECT $o:.customer${root}.oid() WHERE $s:.customer${root}.id='c1111'","email":"support@schemafreesql.com"},"o:lineitem":[{"o:item":{"#ref":"SELECT $o:.product${root}.oid() WHERE $s:.product${root}.code='3DcAM01'","i:totalordered":{"#pass":"v + 1"}},"i:no":1,"i:qty":1,"n:price":300.0},{"o:item":{"#ref":"SELECT $o:.product${root}.oid() WHERE $s:.product${root}.code='wristWear03'","i:totalordered":{"#pass":"v + 2"}},"i:no":2,"i:qty":2,"n:price":100.0}]},{"i:order_id":2,"d:datetime":"now","o:cust${root}":{"s:id":"c2222","s:first_name":"Sally","s:last_name":"Swanson","email":"feedback@schemafreesql.com","o:address":{"street":"7 Broadway","city":"New York","state":"NY","zip":"10003"}},"o:lineitem":[{"o:item":{"#ref":"SELECT $o:.product${root}.oid() WHERE $s:.product${root}.code='LPN45'","i:totalordered":{"#pass":"v + 2"}},"i:no":1,"i:qty":2,"n:price":250.0}]}],"o:customer${root}":[{"#append":{}},{"#ref":"SELECT $o:.cust${root}.oid() WHERE $s:.cust${root}.id='c2222'"}]}}}}},{"query":{"sfsql":"SELECT $s:.supplier${root}.name as name, $s:.supplier${root}.id as id","_q":"supp"}},{"query":{"sfsql":"SELECT $s:.product${root}.code as code,$s:.product${root}.name as name,$s:.product${root}.image as image,$n:.product${root}.price as price,$i:.product${root}.totalordered as totordered,$s:.product${root}.manufacturer${root}.name as manname","_q":"prod"}},{"query":{"sfsql":"SELECT $s:.customer${root}.id as cusid,$s:.customer${root}.first_name as fname,$s:.customer${root}.last_name as lname,$s:.customer${root}.email as email,$s:.customer${root}.address.street as street,$s:.customer${root}.address.city as city,$s:.customer${root}.address.state as state,$s:.customer${root}.address.zip as zip","_q":"cust"}},{"query":{"sfsql":"SELECT $i:.order${root}.order_id as orderid, $s:.order${root}.lineitem.item.code as code,$s:.order${root}.lineitem.item.name as name,$s:.order${root}.lineitem.item.manufacturer${root}.name as manname, $s:.order${root}.lineitem.item.image as image, $i:.order${root}.lineitem.no as no, $i:.order${root}.lineitem.qty as quantity, $n:.order${root}.lineitem.price as price, $s:.order${root}.cust${root}.id as cusid,$s:.order${root}.cust${root}.first_name as fname, $s:.order${root}.cust${root}.last_name as lname,$s:.order${root}.cust${root}.email as email,$s:.order${root}.cust${root}.address.street as street, $s:.order${root}.cust${root}.address.city as city, $s:.order${root}.cust${root}.address.state as state,  $s:.order${root}.cust${root}.address.zip as zip","_q":"order"}},{"delete":{"objfilter":"SELECT $o:${root}.attrset('delete')"}},{"purge":{}}]`;
	 
const fetch = require("node-fetch");

const API_ENDPOINT = process.env.endpoint;

exports.handler = async (event, context) => {
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
