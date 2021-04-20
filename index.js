// **********************************
// *** DEPENDENCIES AND VARIABLES ***
// **********************************

// imports and dependencies
var MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var crypto = require('crypto');
const express = require('express')
const upload = require('express-fileupload')
const fs = require('fs')

// Const and global vars
const app = express()
app.use(upload())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
const port = process.env.PORT || 3000
const appDir = '/app'


const mongoDb = "MatriculationDB"
const collectionAlum = "Alumn"
const collectionAdmin = "Admin"
const collectionGrade = "FormativeDegree"
const collectionDocumentsProfile = "DocumentsProfile"
//example of --> var mongoUrl = "mongodb+srv://<username>:<password>@mongoexample.wf7zu.mongodb.net/mongoexample?retryWrites=true&w=majority"
var mongoUrl = process.env.MONGOURL
const jwtKey = process.env.JWTKEY





// ****************
// *** ROUTINGS ***
// ****************

// Enrutamiento para todas las peticiones que lleguen, prepara el header de la response para evitar errores
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, access-token, Access-Control-Allow-Origin');
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
		var passMd5 = crypto.createHash('md5').update(pass).digest("hex");
		dbo.collection(collectionAlum).findOne({email : usr, password : passMd5}, function(err, result) {
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
		//var passMd5 = crypto.createHash('md5').update(pass).digest("hex");
		dbo.collection(collectionAdmin).findOne({username : usr, password : pass}, function(err, result) {
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
app.get('/get/grade', protectedRoute, (req, res) => {
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
	var overwrite = req.body.overwrite;
	if (grade != undefined)
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}	
			var dbo = db.db(mongoDb);
			
			// Check not exists a grade with same careerCode before insert
			
				dbo.collection(collectionGrade).findOne({careerCode : grade.careerCode}, function(err, result) {
					if (err) {
						res.status(400).send({"error": "Error inesperado en el servidor" });
						console.log("ERROR MONGO: " + err);
						return;
					}	
					if (overwrite == "false" && result != null)
					{
						res.status(400).send({"error": "Ya existe un ciclo con este codigo" });
					}
					else
					{
						if (overwrite == "true" && result != null)
						{
							var deleteCodeQuery = { careerCode: grade.careerCode };
							dbo.collection(collectionGrade).deleteOne(deleteCodeQuery, function(err, obj) {
							    if (err) {
									res.status(400).send({"error": "Error inesperado en el servidor" });
									console.log("ERROR MONGO: " + err);
									return;
								}							    
							    db.close();
							 });
						}


						dbo.collection(collectionGrade).insertOne(grade, function(err, result) {
							if (err) {
								res.status(400).send({"error": "Error inesperado en el servidor" });
								console.log("ERROR MONGO: " + err);
								return;
							}
							res.status(200).send({"insertCount" : "1"})
							db.close();
						});
					}			
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
// get /get/allAlumns  --> example: /get/allAlumns?careerCode="CFMP++++0123"
// ---------------------------------------------------------
app.get('/get/allAlumns', protectedRoute, checkAdminToken, (req, res) => {
	
	var qCareerCode = req.query.careerCode
	if (qCareerCode == undefined){
		res.status(400).send({"error":"No se ha informado de un careerCode en la query"})
	}
	else
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" }); 
				console.log("ERROR MONGO: " + err); 
				return;
			} 
			var dbo = db.db(mongoDb);
			dbo.collection(collectionAlum).find({termCode : qCareerCode}).project({name : 1, firstSurname : 1, secondSurname : 1, DNI : 1, NIE: 1, PASS: 1, email: 1}).toArray(function(err, result) {
				if (err) {
					res.status(400).send({"error": "Error inesperado en el servidor" });
					console.log("ERROR MONGO: " + err);
					return;
				}						
				res.status(200).send(result);
				db.close();
			});
			
		});
	}	
})




// ---------------------------------------------------------
// get /get/alumn --> example: /get/alumn?username="user"
// ---------------------------------------------------------
app.get('/get/alumn', protectedRoute, (req, res) => {
	var qUsername = req.query.username
	if (qUsername == undefined){
		res.status(400).send({"error":"No se ha informado de un username en la query"})
	}

	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.status(400).send({"error": "Error inesperado en el servidor" });
			console.log("ERROR MONGO: " + err);
			return;
		}	
		var dbo = db.db(mongoDb);
		dbo.collection(collectionAlum).findOne({email : qUsername}, function(err, result) {
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
				res.status(400).send({"error":"No se ha encontrado ningun alumno"});
			}			
			
			db.close();
		});
		
	});
	
})




// ---------------------------------------------------------
// post /insert/alumn
// ---------------------------------------------------------
app.post('/insert/alumn', protectedRoute, checkAdminToken, (req, res) => {
	var alumn = req.body.alumn;
	if (alumn != undefined)
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}	
			var dbo = db.db(mongoDb);
			
			// Check not exists a alumn with same email or dni before insert
			var identificator;
			if (alumn.DNI)
			{
				identificator = {DNI : alumn.DNI}
			}
			else if (alumn.NIE)
			{
				identificator = {NIE : alumn.NIE}
			}
			else if (alumn.PASS)
			{
				identificator = {PASS : alumn.PASS}
			}
			else
			{
				res.status(400).send({"error": "No se ha informado de ningun identificator valido"})
			}
			dbo.collection(collectionAlum).findOne({$or:[{email : alumn.email}, identificator]}, function(err, result) {
				if (err) {
					res.status(400).send({"error": "Error inesperado en el servidor" });
					console.log("ERROR MONGO: " + err);
					return;
				}	
				if (result != null)
				{
					res.status(400).send({"error": "Ya existe un alumno" });
				}
				else
				{
					dbo.collection(collectionAlum).insertOne(alumn, function(err, result) {
						if (err) {
							res.status(400).send({"error": "Error inesperado en el servidor" });
							console.log("ERROR MONGO: " + err);
							return;
						}
						res.status(200).send({"insertCount" : "1"})
						db.close();
					});
				}			
				db.close();
			});				
		});
	}
	else
	{
		res.status(400).send({"error" : "No se ha informado del campo alumn"})
	}	
})



// ---------------------------------------------------------
// post /update/matriculatedUfs
// ---------------------------------------------------------
app.post('/update/matriculatedUfs', protectedRoute, (req, res) => {	
	var qMatriculatedUfs = req.body.matriculatedUfs;
	var qEmail = req.body.email;
	if (qMatriculatedUfs != undefined && qEmail != undefined)
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}	
			var dbo = db.db(mongoDb);			
			var query = {email : qEmail};
			var newValues = { $push: {matriculatedUfs: { $each: qMatriculatedUfs } } };
			dbo.collection(collectionAlum).updateOne(query, newValues, function(err, updResult){
				if (err) {
					res.status(400).send({"error": "Error inesperado en el servidor" });
					console.log("ERROR MONGO: " + err);
					return;
				}	
				if (updResult)
				{
					res.status(200).send({"updateCount":"1"});
				}
				else
				{
					res.status(400).send({"error":"no se ha updateado nada"});
				}
				
				db.close();
			});	
		});
	}
	else
	{
		res.status(400).send({"error" : "No se ha informado del campo matriculatedUfs o del campo qEmail"})
	}	
})




// ---------------------------------------------------------
// post /insert/documentsProfile
// ---------------------------------------------------------
app.post('/insert/documentsProfile', protectedRoute, checkAdminToken, (req, res) => {
	var documentsProfile = req.body.documentsProfile;
	var overwrite = req.body.overwrite;
	if (documentsProfile != undefined && overwrite != undefined)
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}	
			var dbo = db.db(mongoDb);
			
			// Check not exists a alumn with same email or dni before insert
			
			dbo.collection(collectionDocumentsProfile).findOne({name : documentsProfile.name}, function(err, result) {
				if (err) {
					res.status(400).send({"error": "Error inesperado en el servidor" });
					console.log("ERROR MONGO: " + err);
					return;
				}	
				if (overwrite == "false" && result != null)
				{
					res.status(400).send({"error": "Ya existe un perfil de documentos con el nombre " + documentsProfile.name});
				}
				else
				{
					if (overwrite == "true" && result != null)
					{
						var query = {name : documentsProfile.name};
						var newValues = { $set: {arrayDoc: documentsProfile.arrayDoc, 
												 description : documentsProfile.description} };
						dbo.collection(collectionDocumentsProfile).updateOne(query, newValues, function(err, updResult){
							if (err) {
								res.status(400).send({"error": "Error inesperado en el servidor" });
								console.log("ERROR MONGO: " + err);
								return;
							}	
							res.status(200).send({"insertCount":"1"});
							db.close();
						});	
					}
					else
					{
						dbo.collection(collectionDocumentsProfile).insertOne(documentsProfile, function(err, result) {
							if (err) {
								res.status(400).send({"error": "Error inesperado en el servidor" });
								console.log("ERROR MONGO: " + err);
								return;
							}
							res.status(200).send({"insertCount" : "1"})
							db.close();
						});
					}
					
				}			
				db.close();
			});				
		});
	}
	else
	{
		res.status(400).send({"error" : "No se ha informado del campo alumn"})
	}	
})



// ---------------------------------------------------------
// get /get/allDocumentsProfile
// ---------------------------------------------------------
app.get('/get/allDocumentsProfile', protectedRoute, (req, res) => {

	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.status(400).send({"error": "Error inesperado en el servidor" }); 
			console.log("ERROR MONGO: " + err); 
			return;
		} 
		var dbo = db.db(mongoDb);
		dbo.collection(collectionDocumentsProfile).find({}).toArray(function(err, result) {
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
// get /get/documentsProfile' --> example: /get/documentsProfile?name="nombre"
// ---------------------------------------------------------
app.get('/get/documentsProfile', protectedRoute, (req, res) => {
	var qName = req.query.name
	if (qName == undefined){
		res.status(400).send({"error":"No se ha informado de un name en la query"})
	}
	else
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}	
			var dbo = db.db(mongoDb);
			dbo.collection(collectionDocumentsProfile).findOne({name : qName}, function(err, result) {
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
					res.status(400).send({"error":"No se ha encontrado ningun documentsProfile con ese name"});
				}			
				
				db.close();
			});			
		});
	}	
})




// ---------------------------------------------------------
// post /update/matriculatedUfs
// ---------------------------------------------------------
app.post('/update/selectedDocumentsProfile', protectedRoute, (req, res) => {	
	var qDocumentsProfile = req.body.documentsProfile;
	var qEmail = req.body.email;
	if (qDocumentsProfile != undefined && qEmail != undefined)
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}	
			var dbo = db.db(mongoDb);			
			var query = {email : qEmail};
			var newValues = { $set: {selectedDocumentsProfile: qDocumentsProfile} };
			dbo.collection(collectionAlum).updateOne(query, newValues, function(err, updResult){
				if (err) {
					res.status(400).send({"error": "Error inesperado en el servidor" });
					console.log("ERROR MONGO: " + err);
					return;
				}	
				if (updResult)
				{
					res.status(200).send({"updateCount":"1"});
				}
				else
				{
					res.status(400).send({"error":"no se ha updateado nada"});
				}
				
				db.close();
			});	
		});
	}
	else
	{
		res.status(400).send({"error" : "No se ha informado del campo matriculatedUfs o del campo qEmail"})
	}	
})



//---------------------------------------------------------
// post /upload/documentsFile
// ---------------------------------------------------------
app.post('/upload/documentsFile', protectedRoute, (req, res) => {	
	// req info
	var qEmail = req.body.email;
	var qProfileName = req.body.profileName;
	var qDocumentName = req.body.documentName;
	var file = undefined;
	var fileName = undefined; 

	if (qEmail != undefined && qProfileName != undefined && qDocumentName != undefined && req.files != undefined)
	{
		file = req.files.file;
		fileName = file.name;
		// get email without symbols
		var emailNoSymbols = qEmail.replace('.','').replace('@','');		

		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}	
			var dbo = db.db(mongoDb);			
			dbo.collection(collectionAlum).findOne({email : qEmail, 'selectedDocumentsProfile.name' : qProfileName, 'selectedDocumentsProfile.arrayDoc.documentName' : qDocumentName}, function(err, result) {
				if (err) {
					res.status(400).send({"error": "Error inesperado en el servidor" });
					console.log("ERROR MONGO: " + err);
				}		
				else if (result != null)
				{
					// create dirs if not exists (baseDir, email, profile, document)
					var dirUploads = appDir + '/uploads';
					createDirIfNotExists(dirUploads)

					var dirAlumn = dirUploads + '/' + emailNoSymbols;
					createDirIfNotExists(dirAlumn);

					var dirAlumnProfile = dirAlumn + '/' + qProfileName;
					createDirIfNotExists(dirAlumnProfile);

					var dirAlumnProfileDocument = dirAlumnProfile + '/' + qDocumentName;
					createEmptyDirRemoveIfExists(dirAlumnProfileDocument);

					// save file 
					file.mv(dirAlumnProfileDocument + '/' + fileName, function(err){
						if (err){
							res.status(400).send({"error":"no se ha podido subir el fichero"})
						}
					});

					// update filePath and response
					var query = {email : qEmail, 'selectedDocumentsProfile.name' : qProfileName, 'selectedDocumentsProfile.arrayDoc.documentName' : qDocumentName};
					var newValues = { $set: {'selectedDocumentsProfile.arrayDoc.$.filePath': dirAlumnProfileDocument + '/' + fileName} };
					dbo.collection(collectionAlum).updateOne(query, newValues, function(err, updResult){
						if (err) {
							res.status(400).send({"error": "Error inesperado en el servidor" });
							console.log("ERROR MONGO: " + err);
						}
						else if (updResult)
						{
							res.status(200).send({"ok":"fichero subido correctamente"});
						}
						else
						{
							res.status(400).send({"error":"no se ha podido actualizar el campo de ruta en la base de datos"});
						}				
						db.close();
					});	
				}	
				else
				{
					res.status(400).send({"error":"No se ha encontrado ningun alumno con ese email, perfil y documento"});
				}		
				db.close();
			});		
		});
	}
	else
	{
		res.status(400).send({"error":"No se ha informado de algun campo obligatorio"});
	}	
});

function createDirIfNotExists(dir)
{
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
}

function createEmptyDirRemoveIfExists(dir)
{
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	else
	{
		fs.rmdirSync(dir, { recursive: true });
		fs.mkdirSync(dir);
	}
}



// ---------------------------------------------------------
// post /get/document
// ---------------------------------------------------------
app.post('/get/document', protectedRoute, checkAdminToken, (req, res) => {
	var qUsername = req.body.email
	var qProfileName = req.body.profileName
	var qDocumentName = req.body.documentName
	if (qUsername != undefined && qProfileName != undefined && qDocumentName != undefined)
	{
		var query = {email : qUsername, 'selectedDocumentsProfile.name' : qProfileName, 'selectedDocumentsProfile.arrayDoc.documentName' : qDocumentName};
		var project = {projection: {'selectedDocumentsProfile.arrayDoc.$' : 1} };
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
			}	
			else
			{
				var dbo = db.db(mongoDb);
				dbo.collection(collectionAlum).findOne(query, project, function(err, result) {
					if (err) {
						res.status(400).send({"error": "Error inesperado en el servidor" });
						console.log("ERROR MONGO: " + err);
					}		
					else if (result != null)
					{
						console.log(result.selectedDocumentsProfile.arrayDoc[0]);
						let buff = fs.readFileSync(result.selectedDocumentsProfile.arrayDoc[0].filePath);
						let base64data = buff.toString('base64');

						res.status(200).send({"filePath" : result.selectedDocumentsProfile.arrayDoc[0].filePath, "data" : base64data});
					}	
					else
					{
						res.status(400).send({"error":"No se ha encontrado ningun resultado"});
					}			
					
					db.close();
				});
			}						
		});
	}
	else
	{
		res.status(400).send({"error":"No se ha informado de algun campo obligatorio"});	
	}
	
	
});




//---------------------------------------------------------
// post /update/validateFile
// ---------------------------------------------------------
app.post('/update/validateFile', protectedRoute, checkAdminToken, (req, res) => {	
	// req info
	var qEmail = req.body.email;
	var qProfileName = req.body.profileName;
	var qDocumentName = req.body.documentName; 

	if (qEmail != undefined && qProfileName != undefined && qDocumentName != undefined)
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
				return;
			}	
			var dbo = db.db(mongoDb);			
			dbo.collection(collectionAlum).findOne({email : qEmail, 'selectedDocumentsProfile.name' : qProfileName, 'selectedDocumentsProfile.arrayDoc.documentName' : qDocumentName}, function(err, result) {
				if (err) {
					res.status(400).send({"error": "Error inesperado en el servidor" });
					console.log("ERROR MONGO: " + err);
				}		
				else if (result != null)
				{
					// update validate and response
					var query = {email : qEmail, 'selectedDocumentsProfile.name' : qProfileName, 'selectedDocumentsProfile.arrayDoc.documentName' : qDocumentName};
					var newValues = { $set: {'selectedDocumentsProfile.arrayDoc.$.validate': "OK"} };
					dbo.collection(collectionAlum).updateOne(query, newValues, function(err, updResult){
						if (err) {
							res.status(400).send({"error": "Error inesperado en el servidor" });
							console.log("ERROR MONGO: " + err);
						}
						else if (updResult)
						{
							res.status(200).send({"ok":"fichero validado correctamente"});
						}
						else
						{
							res.status(400).send({"error":"no se ha podido actualizar el campo de validacion en la base de datos"});
						}				
						db.close();
					});	
				}	
				else
				{
					res.status(400).send({"error":"No se ha encontrado ningun alumno con ese email, perfil y documento"});
				}		
				db.close();
			});		
		});
	}
	else
	{
		res.status(400).send({"error":"No se ha informado de algun campo obligatorio"});
	}
});





// ---------------------------------------------------------
// post /update/alumn
// ---------------------------------------------------------
app.post('/update/alumn', protectedRoute, checkAdminToken, (req, res) => {
	var qUsername = req.body.email
	var qUpdatedFields = req.body.updatedFields
	console.log(body);
	if (qUsername != undefined && qUpdatedFields != undefined)
	{
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) {
				res.status(400).send({"error": "Error inesperado en el servidor" });
				console.log("ERROR MONGO: " + err);
			}
			else
			{
				var dbo = db.db(mongoDb);			
				dbo.collection(collectionAlum).findOne({email : qEmail}, function(err, result) {
					if (err) {
						res.status(400).send({"error": "Error inesperado en el servidor" });
						console.log("ERROR MONGO: " + err);
					}		
					else if (result != null)
					{
						// update validate and response
						var query = {email : qEmail};
						var newValues = { $set: updatedFields };
						dbo.collection(collectionAlum).updateOne(query, newValues, function(err, updResult){
							if (err) {
								res.status(400).send({"error": "Error inesperado en el servidor" });
								console.log("ERROR MONGO: " + err);
							}
							else if (updResult)
							{
								res.status(200).send({"ok":"alumno actualizado correctamente"});
							}
							else
							{
								res.status(400).send({"error":"no se ha podido actualizar el alumno"});
							}				
							db.close();
						});	
					}	
					else
					{
						res.status(400).send({"error":"No se ha encontrado ningun alumno con ese email, perfil y documento"});
					}		
					db.close();
				});			
			}				
		});
	}
	else
	{
		res.status(400).send({"error":"No se ha informado de algun campo obligatorio"});	
	}
});

// ---------------------------------------------------------
// listen port
// ---------------------------------------------------------
app.listen(port, () => {
  console.log(`app running, listening at ${port}`)
})
