const sql = require('mssql/msnodesqlv8');
const express = require("express");
const flash=require('connect-flash');
const session = require('express-session');
const app = express();
const ejs=require('ejs');
app.set('view engine','ejs');
//const popup=require('popups');
app.use(flash());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var config = {
	database: 'userpersonal',
	server: 'DESKTOP-V5MOP7Q',
	driver: 'msnodesqlv8',
	options: {
		trustedConnection: true
	}
};
var data={
	active:false,
	value:0,
	username:"NULL",
	msg:"NULL"
}
var cart={
    image:"NULL",
	quantity:0,
	price:0,
	flag:0,
}
var sdata={
	flag:0,
	active:false,
	name:"NULL",
	msg1:"NULL"
}
var orderdetails={
	name:"NULL",
	address:"NULL",
	proname:"NULL",
	quantity:0,
	price:0,
	image:"NULL",
	
}
sql.connect(config, function (err) {
	if (err) {
		console.log(err);
	}
	var request = new sql.Request();
	request.query('select * from dbo.authenpage', function (err, recordSet) {
		if (err) {
			console.log(err);
		} else {
			console.log(recordSet);
			
		}
	});
})



app.use('/img', express.static(__dirname + '/images'));
app.use('/style.css', express.static(__dirname + '/style.css'));
app.use('/favicon', express.static(__dirname + '/favicon_io'));
//app.use('/home.js', express.static(__dirname + '/home.js'));

app.get('/', function (request, response) {
	// Render login template
	response.render('pages/home',{
		sdata:sdata,data:data
	});
});
app.get('/home.ejs', function (request, response) {
	// Render login template
	response.render('pages/home',{
		sdata:sdata,data:data
	});
});
app.get('/signup.ejs', function (request, response) {
	// Render login template
	response.render('pages/signup',{
		sdata:sdata,data:data
	});
});
app.get('/myprofile.ejs', function (request, response) {
	// Render login template
	response.render('pages/myprofile',{
		cart:cart,data:data,orderdetails:orderdetails
	});
});
app.get('/mycart.ejs', function (request, response) {
	// Render login template
	response.render('pages/mycart',{
		cart:cart,data:data,orderdetails:orderdetails
	});
});
app.get('/butter.ejs', function (request, response) {
	// Render login template
	response.render('pages/butter',{
	data:data});
});
app.get('/help.ejs', function (request, response) {
	// Render login template
	response.render('pages/help');
});
app.get('/product.ejs', function (request, response) {
	// Render login template
	response.render('pages/product',{
		data:data
	});
});
app.get('/icecream.ejs', function (request, response) {
	// Render login template
	response.render('pages/icecream',{
		data:data
	});
});
app.get('/ghee.ejs', function (request, response) {
	// Render login template
	response.render('pages/ghee',{
		data:data
	});
});
app.get('/curd.ejs', function (request, response) {
	// Render login template
	response.render('pages/curd',{
		data:data
	});
});

///------------------------signin section -------------------------------------------------------
app.post('/signup', function (request, response) {
	
	var req = new sql.Request();
	// Capture the input fields
	let username = request.body.username;
	let isactive=true;
	let res = [];
	let password = request.body.password;
	// Ensure the input fields exists and are not 
	if (username!="" && password!="") {
		console.log("the username is" + username + "the password is:" + password);
		//console.log(username);console.log(password);
		if(req.query("SELECT * FROM dbo.authenpage WHERE username ='" + username + "' AND password ='" + password + "'", function (error, results, fields)
		{
		var jsonRes = JSON.stringify(results);
		console.log(JSON.stringify(results));
		    if (error) {
			console.log("the error is:" + error);
		       }
		console.log("the result is :" + results);
		let r=JSON.parse(jsonRes).recordset;
		console.log(r);
		res =Object.entries(r);
		/* let res2=Object.entries(res.recordset).length; */
		console.log("frecordset is :" +res.length);

		if (res.length> 0) {
			    sdata.flag=1;
				sdata.msg1="username already registered!!!  try another name!";
			response.render('pages/signup',{sdata:sdata,data:data});	
			sdata.flag=0;
			//response.send('username already registered!!!  try another name!');
		}
		else{
		// Execute SQL query that'll select the account from the database based on the specified username and password
		req.query("INSERT INTO dbo.authenpage ([username],[password],[isactive]) VALUES ('"+username+"', '"+password+"','"+isactive+"')",function (error, results, fields){
            
		/* let res2=Object.entries(res.recordset).length; */
		console.log("frecordset is :" +res.length);
			console.log("the result is :" + results);
			console.log("frecordset is :" +res.length);
			
				sdata.flag=1;
				sdata.name=username;
				sdata.active="true";
				sdata.msg1="Successfully signed up!!";
			response.render('pages/home',{sdata:sdata,data:data});	
			sdata.flag=0;
			//response.redirect('/home.ejs');
			response.end();
		});
	}
}
));}
	 else {
		sdata.flag=1;
		//alert("Please enter Username and Password!");
			sdata.msg1="Please enter Username and Password!";
		response.render('pages/signup',{sdata:sdata,data:data});	
		sdata.flag=0;
		//response.send('Please enter Username and Password!');
		response.end();
	}});

	///----------------------login section--------------------------------------------------------

app.post('/a', function (request, response) {
	var req = new sql.Request();
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	
	let res = [];
	// Ensure the input fields exists and are not empty
	if (username!="" && password!="") {
		console.log("the username is" + username + "the password is:" + password);
		console.log(username);
		console.log(password);
		// Execute SQL query that'll select the account from the database based on the specified username and password
		req.query("SELECT * FROM dbo.authenpage WHERE username ='" + username + "' AND password ='" + password + "'", function (error, results, fields) {
			// If there is an issue with the query, output the error
			console.log('SELECT * FROM dbo.authenpage WHERE username = ${username} AND password = ${password}');
			var jsonRes = JSON.stringify(results);
			console.log(JSON.stringify(results));
			if (error) {
				console.log("the error is:" + error);
			}
			console.log("the result is :" + results);
			let r=JSON.parse(jsonRes).recordset;
			console.log(r);
			res =Object.entries(r);
			/* let res2=Object.entries(res.recordset).length; */
			console.log("frecordset is :" +res.length);

			// If the account exists
			if (res.length> 0) {
				console.log('in 2');

				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				request.session.makeAlert=true;
				console.log("in 3");
				
					data.value=1;
					data.active=true;
					data.username=username;
					data.msg="Successfully logged in!";
                response.render('pages/home',{sdata:sdata,data:data});			
				data.value=0;
			}
			else {
				
					data.value=1;
					data.active=false;
					data.msg="Incorrect Username or Password!";
                response.render('pages/home',{sdata:sdata,data:data});
				data.value=0;
				//response.redirect('/home.html');
			}
			response.end();
		});
	} else {
		
			data.value=1;
			data.active=false;
			data.msg="Please enter username and password!";
                response.render('pages/home',{sdata:sdata,data:data});
				data.value=0;
		response.end();
	}
});

//----------------------------------search----------------------------------------------------
app.post('/search', function (request, response) {
	let product=request.body.search;
	if(product=="milk"||product=="Milk"||product=="MILK"){	
		response.render('pages/product',{sdata:sdata,data:data});
	}
	else if(product=="curd"||product=="Curd"||product=="CURD"){	
		response.render('pages/curd',{sdata:sdata,data:data});
	}
	else if(product=="butter"||product=="BUTTER"||product=="Butter"){	
		response.render('pages/butter',{sdata:sdata,data:data});
	}
	else if(product=="ghee"||product=="Ghee"||product=="GHEE"){	
		response.render('pages/ghee',{sdata:sdata,data:data});
	}
	else if(product=="icecream"||product=="Icecream"||product=="ICECREAM"){	
		response.render('pages/icecream',{sdata:sdata,data:data});
	}
})
//--------------------------------------profile-------------------------------------------------
app.post('/profile', function (request, response) {
    var quan=request.body.quantity;
	var image=request.body.image;
	var price=request.body.amount;
	var flag=request.body.flag;
	console.log(quan);
	console.log(image);
	cart.image=image;
	cart.quantity=quan;
	cart.price=price;
	cart.flag=flag;
	console.log(cart.quantity);
	console.log(cart.price);
	response.render('pages/mycart',{cart:cart,data:data,orderdetails:orderdetails});
	response.end();
});
//---------------------------------------------placeorder-----------------------------------------
app.post('/order',function(request,response){
var name=request.body.name;
var address=request.body.address;
var product=cart.image;
var price=cart.price;
var quantity=cart.quantity;
price=price*quantity;
var image=cart.image;
console.log(name+"order");
	console.log(address+"order");
	console.log(quantity+"order");
	console.log(product+"order");
	console.log(price+"order");
	var req = new sql.Request();
if(name!="" && address!="" && product!="" && price!="" && quantity!="" && image!="")
{
	console.log("inorder");
	// Execute SQL query that'll select the account from the database based on the specified username and password
	req.query("INSERT INTO dbo.orderproduct ([name],[address],[product],[quantity],[price],[imagename]) VALUES ('"+name+"', '"+address+"','"+product+"','"+quantity+"','"+price+"','"+image+"')",function (error, results, fields){
		console.log("the result is :" + results);
		orderdetails.name=name,
		orderdetails.address=address,
		orderdetails.proname=product,
		orderdetails.quantity=quantity,
		orderdetails.price=price,
		orderdetails.image=image,
		cart.image="NULL",
	cart.quantity=0,
	cart.price=0,
		cart.flag=0;
		data.value=0;
		data.active=false;
			response.render('pages/myprofile',{cart:cart,data:data,orderdetails:orderdetails});	
			//response.redirect('/home.ejs');
			response.end();
	});
}
});

app.get("/home.ejs", function (req, res) {
	res.sendFile(__dirname + "/home.ejs")
});
app.listen(3070);