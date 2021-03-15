var MongoClient = require('mongodb').MongoClient;

//example --> var mongoUrl = "mongodb+srv://<username>:<password>@mongoexample.wf7zu.mongodb.net/mongoexample?retryWrites=true&w=majority"
var mongoUrl = process.env.MONGOURL


var bodyParser = require('body-parser')

var crypto = require('crypto');

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongoDb = "MatriculationDB"
const collectionAlum = "Alumn"
const collectionAdmin = "Admin"

const jwt = require('jsonwebtoken')

const alphaNumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'


const config = require('./configs/configs');

app.set('jwtKey', config.jwtKey)

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});




app.post('/login/alumn', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	if (username != undefined && password != undefined)
	{
		checkAlumnLogin(username, password, res);
	}
	else
	{
		res.status(400).send({"status":"KO","statusData":"No se ha podido procesar la solicitud ya que no se informa de un usuario y contraseña"})
	}	
})

function checkAlumnLogin(usr, pass, res)
{
	var queryResult;
	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) throw err;
		var dbo = db.db(mongoDb);
		var passMd5 = crypto.createHash('md5').update(pass).digest("hex");
		dbo.collection(collectionAlum).findOne({username : usr, password : passMd5}, function(err, result) {
			if (err) throw err;
			if (result != null)
			{
				alumnLoginCallback(result, res, db, dbo)
			}
			else
			{
				res.status(400).send({"status":"KO","statusData":"Los datos de login son incorrectos"})
			}			
			db.close();
		});		
	});
}

function alumnLoginCallback(result, res, db, dbo) 
{
	var token = jwt.sign({id : result._id}, app.get('jwtKey'), {expiresIn: 1440});
	var query = {_id : result._id};
	var newValues = { $set: {sessionToken: token} };
	dbo.collection(collectionAlum).updateOne(query, newValues, function(err, updResult){
		if (err) throw err;
		res.status(200).send({"status":"OK","statusData":token});
		db.close();
	});	
}

app.post('/login/admin', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	if (username != undefined && password != undefined)
	{
		checkAdminLogin(username, password, res);
	}
	else
	{
		res.status(400).send({"status":"KO","statusData":"No se ha podido procesar la solicitud ya que no se informa de un usuario y contraseña"})
	}	
})

function checkAdminLogin(usr, pass, res)
{
	var queryResult;
	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) throw err;
		var dbo = db.db(mongoDb);
		var passMd5 = crypto.createHash('md5').update(pass).digest("hex");
		dbo.collection(collectionAdmin).findOne({username : usr, password : passMd5}, function(err, result) {
			if (err) throw err;
			if (result != null)
			{
				adminLoginCallback(result, res, db, dbo)
			}
			else
			{
				res.status(400).send({"status":"KO","statusData":"Los datos de login son incorrectos"})
			}			
			db.close();
		});		
	});
}

function adminLoginCallback(result, res, db, dbo) 
{
	var token = jwt.sign({id : result._id}, app.get('jwtKey'), {expiresIn: 1440});
	var query = {_id : result._id};
	var newValues = { $set: {sessionToken: token} };
	dbo.collection(collectionAdmin).updateOne(query, newValues, function(err, updResult){
		if (err) throw err;
		res.status(200).send({"status":"OK","statusData":token});
		db.close();
	});	
}



function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}	


app.listen(port, () => {
  console.log(`app running, listening at ${port}`)
})
