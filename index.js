// **********************************
// *** DEPENDENCIES AND VARIABLES ***
// **********************************

// imports and dependencies
var MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var crypto = require('crypto');
const express = require('express')

// Const and global vars
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const mongoDb = "MatriculationDB"
const collectionAlum = "Alumn"
const collectionAdmin = "Admin"
const collectionGrade = "FormativeDegree"
//example of --> var mongoUrl = "mongodb+srv://<username>:<password>@mongoexample.wf7zu.mongodb.net/mongoexample?retryWrites=true&w=majority"
var mongoUrl = process.env.MONGOURL
const jwtKey = process.env.JWTKEY




// ****************
// *** ROUTINGS ***
// ****************

// Enrutamiento para todas las peticiones que lleguen, prepara el header de la response para evitar errores
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Enrutamiento opcional, para proteger endpoints con autenticacion por token
const protectedRoute = express.Router(); 
protectedRoute.use((req, res, next) => {
    const token = req.headers['access-token']; 
    if (token) {
      jwt.verify(token, jwtKey, (err, decoded) => {      
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

// Segundo enrutamiento opcional, para rutas protegidas con permisos de administrador
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





// **********************
// *** ENDPOINTS LIST ***
// **********************

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
		//var passMd5 = crypto.createHash('md5').update(pass).digest("hex");
		dbo.collection(collectionAlum).findOne({username : usr, password : pass}, function(err, result) {
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
	var token = jwt.sign({id : result._id, admin : false}, jwtKey, {expiresIn: 1440});
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
	var token = jwt.sign({id : result._id, admin : true}, jwtKey, {expiresIn: 1440});
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
		if (err) {
			res.status(400).send({"error": "Error inesperado en el servidor" }); 
			console.log("ERROR MONGO: " + err); 
			return;
		} 
		var dbo = db.db(mongoDb);
		dbo.collection(collectionGrade).find({}).project({careerCode : 1, careerName : 1}).toArray(function(err, result) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}						
			res.status(200).send(result);
			db.close();
		});
		
	});
	
})




// ---------------------------------------------------------
// get /get/grade --> example: /get/grade?careerCode="CFMP++++0123"
// ---------------------------------------------------------
app.get('/get/grade', protectedRoute, checkAdminToken, (req, res) => {
	var qCareerCode = req.query.careerCode
	if (qCareerCode == undefined){
		res.status(400).send({"error":"No se ha informado de un careerCode en la query"})
	}

	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.status(400).send({"error": "Error inesperado en el servidor" });
			console.log("ERROR MONGO: " + err);
			return;
		}	
		var dbo = db.db(mongoDb);
		dbo.collection(collectionGrade).findOne({careerCode : qCareerCode}, function(err, result) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}		
			if (result != null)
			{
				res.status(200).send(result);
			}	
			else
			{
				res.status(400).send({"error":"No se ha encontrado ningun ciclo con ese careerCode"});
			}			
			
			db.close();
		});
		
	});
	
})




// ---------------------------------------------------------
// post /insert/grade
// ---------------------------------------------------------
app.post('/insert/grade', protectedRoute, checkAdminToken, (req, res) => {
	var grade = req.body.grade;
	if (grade != undefined)
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}	
			var dbo = db.db(mongoDb);			
			dbo.collection(collectionGrade).insertOne(grade, function(err, result) {
				if (err) {
					res.status(400).send({"error": "Error inesperado en el servidor" });
					console.log("ERROR MONGO: " + err);
					return;
				}
				res.status(200).send({"insertCount" : "1"})
				db.close();
			});
		});
	}
	else
	{
		res.status(400).send({"error" : "No se ha informado del campo grade"})
	}	
})






// ---------------------------------------------------------
// listen port
// ---------------------------------------------------------
app.listen(port, () => {
  console.log(`app running, listening at ${port}`)
})
