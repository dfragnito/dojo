const html = sfsqlResultPayload => `<!DOCTYPE html>
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
    var results = \`${sfsqlResultPayload}\`
     var obj = JSON.parse(results);
	 
	 let sups = obj.filter(supp => supp._q == "supp")[0]["data"];
	 let prods = obj.filter(prod => prod._q == "prod")[0]["data"]; 
	 let custs = obj.filter(cust => cust._q == "cust")[0]["data"]; 
	 let items = obj.filter(order => order._q == "order")[0]["data"]; 
	 let items1 = items.filter(obj => {
				return obj.orderid === 1;
			});
	 let items2 = items.filter(obj => {
				return obj.orderid === 2;
			});


let destEle = document.getElementById('examplewrap');
if (!destEle) {
	alert('could not find element examplewrap');
	exit;
}
	 
// Suppliers
//examplewrap.innerHTML += ("test"); 
document.write("<table>");
document.write("<tr><td colspan=" + sups.length + "><b>SUPPLIERS</b></td></tr>");	
document.write("<tr>"); 
for (var j = 0; j < sups.length; j++){
       document.write("<td>");	 
	 Object.entries(sups[j]).forEach(entry => {
		  const [key, value] = entry;
		  //console.log(key, value);
		  document.write(key + ": " +  value + "<br>");  
		});
		   document.write("</td>");	
	} 
document.write("</tr></table>"); 	

document.write("<br>"); 


//Products
document.write("<table>"); 
document.write('<tr><td colspan="' + prods.length + '"><b>PRODUCTS</b></td></tr>');	
document.write("<tr>"); 
for (var j = 0; j < prods.length; j++){
       document.write("<td>");	 
	 Object.entries(prods[j]).forEach(entry => {
		  const [key, value] = entry;
		  if(key== 'image'){ 
		   document.write('<img src="https://sfsqlblogimages.s3.amazonaws.com/product-images/'+ value +'"/><br>'); 
			}else{
			document.write(key + ": " +  value + "<br>");  
			}
		});
		   document.write("</td>");	
	} 
document.write("</tr></table>");

	document.write("<br>"); 
	
//Customers
document.write("<table>"); 
document.write('<tr><td colspan="' + custs.length + '"><b>Customers</b></td></tr>');	
document.write("<tr>"); 
for (var j = 0; j < custs.length; j++){
       document.write("<td>");	 
	 //Object.entries(custs[j]).forEach(entry => {
		 // const [key, value] = entry;
		 // document.write(key + ": " +  value + "<br>");  
		//});
		document.write("First Name : " + custs[j]['fname'] + "<br>"); 
		document.write("Last Name: " + custs[j]['lname'] + "<br>"); 
		document.write("ID: " + custs[j]['cusid'] + "<br>");
		document.write("Email: " + custs[j]['email'] + "<br>");	
      document.write("Address <br>"); 
      document.write(custs[j]['street'] + "<br>");
      document.write(custs[j]['city'] + " " + custs[j]['state'] + " " + custs[j]['zip']);	
		document.write("</td>");	
	} 
document.write("</tr></table>");
	
	
//Order	1	
document.write("<br><br>"); 
	
document.write("<table>"); 
document.write('<tr><td colspan="7"><b>Order 1</b></td></tr>');	
document.write("<tr>"); 
document.write('<td colspan="7">Order ID: ' + items1[0]['orderid'] + '<br>Customer: ' + items1[0]['fname'] + ' ' + items1[0]['lname'] +'<br>Email: '+ items1[0]['email'] +'<br>Cust ID: '+ items1[0]['cusid'] +'<br>Address:<br>');
document.write(items1[0]['street'] + "<br>" + items1[0]['city'] + " " + items1[0]['state'] + "  " + items1[0]['zip']);
document.write("</td></tr>"); 
document.write('<tr><th>Item Number</th><th>Product</th><th>Code</th><th>Manufacturer</th><th>Quantity</th><th>Unit Price</th><th>Subtotal</th></tr>');	
var t = 0;
for (var j = 0; j < items1.length; j++){
      document.write("<tr>"); 
		document.write("<td>" + items1[j]['no'] + "</td>"); 
		document.write('<td><img src="https://sfsqlblogimages.s3.amazonaws.com/product-images/' + items1[j]['image'] + '"/><br>' + items1[j]['name'] + '</td>'); 
	   document.write("<td>" + items1[j]['code'] + "</td>"); 
		document.write("<td>" + items1[j]['manname'] + "</td>");
		document.write("<td>" + items1[j]['quantity'] + "</td>"); 
		document.write("<td>" + items1[j]['price'] + "</td>"); 
		document.write("<td>" + items1[j]['price'] * items1[j]['quantity'] + "</td>"); 
		document.write("</tr>");
		var subtot = items1[j]['price'] * items1[j]['quantity'];
      t += subtot;	
	} 
document.write('<tr><td colspan="6" align="right">Total:</td><td>' + t + '</td></tr>');
document.write("</table>");

//Order	2
document.write("<br><br>"); 
	
document.write("<table>"); 
document.write('<tr><td colspan="7"><b>Order 2</b></td></tr>');	
document.write("<tr>"); 
document.write('<td colspan="7">Order ID: ' + items2[0]['orderid'] + '<br>Customer: ' + items2[0]['fname'] + ' ' + items2[0]['lname'] +'<br>Email: '+ items2[0]['email'] +'<br>Cust ID: '+ items2[0]['cusid'] +'<br>Address:<br>');
document.write(items2[0]['street'] + "<br>" + items2[0]['city'] + " " + items2[0]['state'] + "  " + items2[0]['zip']);
document.write("</td></tr>"); 
document.write('<tr><th>Item Number</th><th>Product</th><th>Code</th><th>Manufacturer</th><th>Quantity</th><th>Unit Price</th><th>Subtotal</th></tr>');	
var t = 0;
for (var j = 0; j < items2.length; j++){
      document.write("<tr>"); 
		document.write("<td>" + items2[j]['no'] + "</td>"); 
		document.write('<td><img src="https://sfsqlblogimages.s3.amazonaws.com/product-images/' + items2[j]['image'] + '"/><br>' + items2[j]['name'] + '</td>'); 
	   document.write("<td>" + items2[j]['code'] + "</td>"); 
		document.write("<td>" + items2[j]['manname'] + "</td>");
		document.write("<td>" + items2[j]['quantity'] + "</td>"); 
		document.write("<td>" + items2[j]['price'] + "</td>"); 
		document.write("<td>" + items2[j]['price'] * items2[j]['quantity'] + "</td>"); 
		document.write("</tr>");
		var subtot = items2[j]['price'] * items2[j]['quantity'];
      t += subtot;	
	} 
document.write('<tr><td colspan="6" align="right">Total:</td><td>' + t + '</td></tr>');
document.write("</table>");
document.write("<br><br>"); 
    
  </script>
 </body>
	 </html>`;
	 
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
      body: html(JSON.stringify(data)),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};	 
