var MongoClient = require('mongodb').MongoClient;

//example --> var mongoUrl = "mongodb+srv://<username>:<password>@mongoexample.wf7zu.mongodb.net/mongoexample?retryWrites=true&w=majority"
var mongoUrl = process.env.MONGOURL || "mongodb+srv://Dani:Monsterhunter3@firstcluster.4htxv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


var bodyParser = require('body-parser')

var crypto = require('crypto');

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongoDb = "MatriculationDB"
const collectionAlum = "Alumn"
const collectionAdmin = "Admin"
const collectionGrade = "FormativeDegree"

const jwt = require('jsonwebtoken')

const alphaNumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'


const config = require('./configs/configs');

// Enrutamiento para proteger endpoints con autenticacion por token
const protectedRoute = express.Router(); 
protectedRoute.use((req, res, next) => {
    const token = req.headers['access-token']; 
    if (token) {
      jwt.verify(token, app.get('jwtKey'), (err, decoded) => {      
        if (err) {
          res.status(400).send({error: "El token informado no es valido" });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.status(400).send({error: "Token no informada en el header access-token"});
    }
 });

// Segundo enrutamiento para rutas protegidas con permisos de administrador
const checkAdminToken = express.Router(); 
checkAdminToken.use((req, res, next) => {
    if (req.decoded.admin != undefined && req.decoded.admin == true)
    {
    	next();
    }
    else
    {
    	res.status(400).send({error: "No permitido"});
    }
 });



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


// ---------------------------------------------------------
// post /login/alumn
// ---------------------------------------------------------

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
	var token = jwt.sign({id : result._id, admin : false}, app.get('jwtKey'), {expiresIn: 1440});
	var query = {_id : result._id};
	var newValues = { $set: {sessionToken: token} };
	dbo.collection(collectionAlum).updateOne(query, newValues, function(err, updResult){
		if (err) throw err;
		res.status(200).send({"status":"OK","statusData":token});
		db.close();
	});	
}




// ---------------------------------------------------------
// post /login/admin
// ---------------------------------------------------------
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
	var token = jwt.sign({id : result._id, admin : true}, app.get('jwtKey'), {expiresIn: 1440});
	var query = {_id : result._id};
	var newValues = { $set: {sessionToken: token} };
	dbo.collection(collectionAdmin).updateOne(query, newValues, function(err, updResult){
		if (err) throw err;
		res.status(200).send({"status":"OK","statusData":token});
		db.close();
	});	
}




// ---------------------------------------------------------
// get /get/allGrades
// ---------------------------------------------------------
app.get('/get/allGrades', protectedRoute, checkAdminToken, (req, res) => {

	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) throw err;
		var dbo = db.db(mongoDb);
		dbo.collection(collectionGrade).find({}).project({careerCode : 1, careerName : 1}).toArray(function(err, result) {
			if (err) throw err;						
			res.status(200).send(result);
			db.close();
		});
		
	});
	
})




// ---------------------------------------------------------
// get /get/allGrades
// ---------------------------------------------------------
app.get('/get/grade', (req, res) => {
	var qCareerCode = req.query.careerCode
	if (qCareerCode == undefined){
		res.status(400).send("No se ha informado de un careerCode en la query")
	}

	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) throw err;
		var dbo = db.db(mongoDb);
		dbo.collection(collectionGrade).findOne({careerCode : qCareerCode}, function(err, result) {
			if (err) throw err;		
			if (result != null)
			{
				res.status(200).send(result);
			}	
			else
			{
				res.status(400).send("No se ha encontrado ningun ciclo con ese careerCode");
			}			
			
			db.close();
		});
		
	});
	
})





// ---------------------------------------------------------
// listen port
// ---------------------------------------------------------
app.listen(port, () => {
  console.log(`app running, listening at ${port}`)
})
