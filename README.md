--------------------------------
****ENDPOINTS DOCUMENTATION****:
--------------------------------

<h2>Alumn Login</h2>
<h4>REQUEST</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /login/alumn
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>username
</td>
<td>text
</td>
<td>Nom de usuari
</td></tr>
<tr>
<td>password
</td>
<td>text
</td>
<td>Password del usuari
</td></tr></tbody></table>
<br>
<h4>RESPONSE</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /login/alumn
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>status
</td>
<td>text
</td>
<td>OK o KO dependiendo de si el login ha sido correcto o no
</td></tr>
<tr>
<td>statusData
</td>
<td>text
</td>
<td>en caso de OK será el token, en caso de KO será el mensaje de error con el motivo
</td></tr></tbody></table>
  
  
  
  <br><br>
  <h2>Admin Login</h2>
<h4>REQUEST</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /login/admin
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>username
</td>
<td>text
</td>
<td>Nom de usuari
</td></tr>
<tr>
<td>password
</td>
<td>text
</td>
<td>Password del usuari
</td></tr></tbody></table>
<br>
<h4>RESPONSE</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /login/admin
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>status
</td>
<td>text
</td>
<td>OK o KO dependiendo de si el login ha sido correcto o no
</td></tr>
<tr>
<td>statusData
</td>
<td>text
</td>
<td>en caso de OK será el token, en caso de KO será el mensaje de error con el motivo
</td></tr></tbody></table>





  <br><br>
  <!-- CICLES -->
  <h2> **CICLES** </h2>
  <!-- /get/allGrades -->
   <h2>Get all grades</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET /get/allGrades
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
</tbody></table>
  <h4>RESPONSE STATUS 200 (Array de objetos)</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON (Array)
</th></tr>
<tr>
<th colspan="3">GET /get/allGrades
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>careerCode
</td>
<td>text
</td>
<td>Codigo del ciclo
</td></tr>
<tr>
<td>careerName
</td>
<td>text
</td>
<td>Nombre del ciclo
</td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/allGrades
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>



<!-- /get/grade -->
  <br>
    <h2>Get Grade</h2>
    <h4>REQUEST (url query)</h4>
    <table class="wikitable">
<tbody><tr>
<th colspan="3">Request (url query)
</th></tr>
<tr>
<th colspan="3">GET /get/grade <br> example: /get/grade?careerCode="CFMP++++0123"
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>careerCode
</td>
<td>text
</td>
<td>Codigo del ciclo
</td></tr>
</tbody></table>
<h4>RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
  </th><tr><td></td><td></td><td>Se devuelve un objeto JSON de grado entero, igual que el de base de datos. <a href="#jsonGrade">Ejemplo</a></td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>




<!-- /insert/grade -->
<br><br>
  <h2>Insert grade</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td>grade</td><td>JSON Object</td><td>Se debe informar de un objeto JSON de grado entero, igual que el de base de datos. <a href="#jsonGrade">Ejemplo</a></td></tr>
  <tr><td>overwrite</td><td>text</td><td>Permite sobreescribir en caso de que ya exista un grado con el mismo codigo. Debe ser "true" o "false" en texto plano</td></tr></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>insertCount
</td>
<td>integer
</td>
<td>Numero de inserciones
</td></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>






<!-- PERFILES DE DOCUMENTOS -->
<h2> **PERFILES DE DOCUMENTOS** </h2>
<!-- /get/allDocumentsProfile -->
<h2>Get all documents profile</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET /get/allDocumentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
</tbody></table>
  <h4>RESPONSE STATUS 200 (Array de objetos)</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON (Array)
</th></tr>
<tr>
<th colspan="3">GET /get/allDocumentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>name
</td>
<td>text
</td>
<td>Nombre del perfil
</td></tr>
<tr>
<td>description
</td>
<td>text
</td>
<td>Descripcion del perfil
</td></tr>
  <tr>
<td>arrayDoc
</td>
<td>JSONArray
</td>
<td>Lista de documentos, Array de objetos JSON, con un unico campo {"documentName":"nombre"}
</td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/allDocumentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>



<!-- /get/documentProfile -->
<br>
    <h2>Get documentProfile</h2>
    <h4>REQUEST (url query)</h4>
    <table class="wikitable">
<tbody><tr>
<th colspan="3">Request (url query)
</th></tr>
<tr>
<th colspan="3">GET /get/documentProfile <br> example: /get/documentProfile?name="nombre"
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>name
</td>
<td>text
</td>
<td>Nombre del perfil
</td></tr>
</tbody></table>
<h4>RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/documentProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
  </th><tr><td></td><td></td><td>Se devuelve un objeto JSON de perfil de documento entero, igual que el de base de datos. <a href="#jsonProfile">Ejemplo</a></td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/documentProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>


<!-- /insert/documentsProfile -->
<br><br>
  <h2>Insert documentsProfile</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/documentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td>documentsProfile</td><td>JSON Object</td><td>Se debe informar de un objeto JSON de perfil entero, igual que el de base de datos. <a href="#jsonProfile">Ejemplo</a></td></tr>
  <tr><td>overwrite</td><td>text</td><td>Permite sobreescribir en caso de que ya exista un perfil con el mismo nombre. Debe ser "true" o "false" en texto plano</td></tr></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/documentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>insertCount
</td>
<td>integer
</td>
<td>Numero de inserciones
</td></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/documentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>






<!-- ALUMNOS -->
<h2> **ALUMNOS** </h2>

<!-- /get/allAlumns -->
<h2>Get all Alumns</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request (url query)
</th></tr>
<tr>
<th colspan="3">GET /get/allAlumns <br> example: /get/allAlumns?careerCode="CFMP++++0123"
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
</tbody></table>
  <h4>RESPONSE STATUS 200 (Array de objetos)</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON (Array)
</th></tr>
<tr>
<th colspan="3">GET /get/allAlumns
</th></tr>
<tr>
<th>Param</th><th>Values</th><th>Description</th></tr>
<tr>
<td>name</td><td>text</td><td>Nombre del alumno</td>
 </tr>
<tr>
<td>firstSurname</td><td>text</td><td>Apellido del alumno</td>
 </tr>
  <tr>
<td>secondSurname</td><td>text</td><td>Segundo apellido del alumno</td>
 </tr>
  <tr>
<td>DNI</td><td>text</td><td>DNI del alumno</td>
 </tr>
  <tr>
<td>NIE</td><td>text</td><td>NIE del alumno</td>
 </tr>
  <tr>
<td>PASS</td><td>text</td><td>PASS (pasaporte) del alumno</td>
 </tr>
 </tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/allAlumns
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>



<!-- /get/alumn -->
<br>
    <h2>Get alumn</h2>
    <h4>REQUEST (url query)</h4>
    <table class="wikitable">
<tbody><tr>
<th colspan="3">Request (url query)
</th></tr>
<tr>
<th colspan="3">GET /get/alumn <br> example: /get/alumn?username="usuario"
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>username
</td>
<td>text
</td>
<td>Nombre de usuario
</td></tr>
</tbody></table>
<h4>RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/alumn
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
  </th><tr><td></td><td></td><td>Se devuelve un objeto JSON de perfil de alumno entero, igual que el de base de datos. <a href="#jsonAlumn">Ejemplo</a></td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/alumn
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>





<!-- /insert/alumn -->
<br><br>
  <h2>Insert alumn</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/alumn
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td>alumn</td><td>JSON Object</td><td>Se debe informar de un objeto JSON de alumno entero, igual que el de base de datos. <a href="#jsonAlumn">Ejemplo</a></td></tr>
  </tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/alumn
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>insertCount
</td>
<td>integer
</td>
<td>Numero de inserciones
</td></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/alumn
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>




<!-- /update/matriculatedUfs -->
<h2>insert/update matriculated ufs (alumn)</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/matriculatedUfs
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td>matriculatedUfs</td><td>JSON ARRAY</td><td>Una JSON ARRAY que contiene los codigos de UFS</td></tr>
  <tr><td>email</td><td>text</td><td>email que identifica el usuario</td></tr></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/matriculatedUfs
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>updateCount
</td>
<td>integer
</td>
<td>Numero de updates
</td></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/matriculatedUfs
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>





<!-- /update/selectedDocumentsProfile -->
<h2>insert/update matriculated ufs (alumn)</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/selectedDocumentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td>documentsProfile</td><td>JSON Object</td><td>Se debe informar de un objeto JSON de documentsProfile entero, igual que el de base de datos. <a href="#jsonProfile">Ejemplo</a></td></tr>
  <tr><td>email</td><td>text</td><td>email que identifica el usuario</td></tr></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/selectedDocumentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>updateCount
</td>
<td>integer
</td>
<td>Numero de updates
</td></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/selectedDocumentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>











<!-- NO IMPLEMENTED -->
<br><br><br>
<h1> NO IMPLEMENTED </h1>
<h2> UPDATE </h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr>
<td>careerCode
</td>
<td>text
</td>
<td>Codigo del ciclo que se quiere updatear
  </td></tr>
  <tr>
<td>grade
</td>
<td>JSON Object
</td>
<td>Un objeto JSON con todos aquellos campos y valores que se quieran actualizar
  </td></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>updateCount
</td>
<td>integer
</td>
<td>Numero de updates
  </td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>


<br>
<h2> DELETE </h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /delete/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr>
<td>careerCodes
</td>
<td>JSON Array
</td>
<td>Codigo/s de el/los ciclo/s que se quiera borrar
  </td></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /delete/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>deleteCount
</td>
<td>integer
</td>
<td>Numero de deletes
  </td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /delete/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>
<br><br><br><h1>JSON EXAMPLES</h1>
<br><h2>Grade JSON<h2>
<pre id="jsonGrade">
  {
  "_id": {
    "$oid": "6059fb701230ad00041e7d8d"
  },
  "curricularAdaptationCode": "00",
  "arrayMO": [
    {
      "MOCode": "AR10001",
      "arrayUF": [
        {
          "FCTIndicator": "N",
          "UFDuration": "21",
          "languageIndicator": "N",
          "UFName": "UF1. Clima i microclima",
          "projectIndicator": "N",
          "UFCode": "AR1000101",
          "synthesisIndicator": "N"
        },
        {
          "FCTIndicator": "N",
          "UFDuration": "63",
          "languageIndicator": "N",
          "UFName": "UF2. Aigua, sòl i fertilització. Ecosistemes",
          "projectIndicator": "N",
          "UFCode": "AR1000102",
          "synthesisIndicator": "N"
        },
        {
          "FCTIndicator": "N",
          "UFDuration": "18",
          "languageIndicator": "N",
          "UFName": "UF3. Topografia",
          "projectIndicator": "N",
          "UFCode": "AR1000103",
          "synthesisIndicator": "N"
        },
        {
          "FCTIndicator": "N",
          "UFDuration": "63",
          "languageIndicator": "N",
          "UFName": "UF4. Botànica",
          "projectIndicator": "N",
          "UFCode": "AR1000104",
          "synthesisIndicator": "N"
        }
      ],
      "MOFinishDate": "",
      "MOMaxDuration": "198",
      "MOName": "MP1. Fonaments agronòmics",
      "MOMinDuration": "0",
      "MOSartDate": "17/02/11"
    }
  ],
  "careerStartDate": "25/01/11",
  "careerFinishDate": "",
  "careerCode": "CFPM    AR10",
  "careerName": "Producció agropecuària",
  "careerHours": "2000"
}
  </pre>
  
  
  <br><br><h2>Alumn JSON<h2>
<pre id="jsonAlumn">
{
    "residenceCountry": "Espanya",
    "modality": "",
    "birthdate": "30/11/2004",
    "firstGuardianSurname2": "Ramos",
    "firstGuardianSurname1": "Soler",
    "secondGuardianSurname2": "",
    "language": "Català i Castellà",
    "secondGuardianSurname1": "Gómez",
    "docTypeFirstGuardian": "DNI",
    "password": "098f6bcd4621d373cade4e832627b4f6",
    "docTypeSecondGuardian": "DNI",
    "RACLIdentification": "620525022",
    "convocatory": " Cicles mitjans d'FP 2020/2021",
    "regimeP1": "Diürn",
    "originInstituteName": "El Pilar",
    "birthCountry": "Espanya",
    "secondSurname": "Gómez",
    "residenceMunicipality": "Cornellà de Llobregat",
    "secondGuardianName": "Aaron",
    "termName": "Sistemes microinformàtics i xarxes",
    "assignedInstituteCode": "08016781",
    "otherInfo": "Bloc: -- Escala: -- Planta: baixos  Porta: 4 Altres dades: --",
    "instituteNameP1": "Institut Esteve Terradas i Illa",
    "numDocFirstGuardian": "45831142P",
    "numDocSecondGuardian": "41834442H",
    "phoneNumber": "614365601",
    "scheduleP1": "Matí",
    "PASS": "",
    "nationality": "Espanya",
    "originInstituteCode": "08016461",
    "convocatoryCode": "PRE20-2100191921",
    "courseP1": "1",
    "termStatus": "Validada",
    "name": "Núria",
    "addressNumber": "11",
    "termType": "SI",
    "originTitleCode": "7",
    "birthMunicipality": "Cornellà de Llobregat",
    "resideceProvince": "Barcelona",
    "instituteMunicipality": "Cornellà de Llobregat",
    "residenceLocality": "Can Fatjó",
    "lastCourse": "4",
    "firstSurname": "Soler",
    "email": "muzqtzsge1@caramail.com",
    "instituteFinanciationP1": "Públic",
    "firstGuardianName": "Josep",
    "originTitleName": "Educació Secundària Obligatòria",
    "instituteSSTT": "Baix Llobregat",
    "sex": "Dona",
    "acces": "CR",
    "NIE": "",
    "CP": "08940",
    "religion": "",
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzQ1OWQ1ZWM4OTgxMDAwNDQyNTY3YiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjE4MzI2MjA4LCJleHAiOjE2MTgzMjc2NDh9.m4fiyyYEYEdGQ6Pgh60UO1hvwLLBPfaPVsIQwe_GhuI",
    "alumnType": "Ordinari",
    "addressName": "Laureà Miró",
    "instituteCodeP1": "08016781",
    "modalityCode": "",
    "DNI": "83326696L",
    "termCode": "CFPM    IC10",
    "TIS": "",
    "selectedDocumentsProfile": {
        "_id": "604f709556b48a1bf4de04ae",
        "arrayDoc": [{
            "name": "Payment"
        }, {
            "name": "DNI"
        }, {
            "name": "Academical expedient"
        }],
        "name": "Basic Profile",
        "description": "Perfil con la imagen del DNI, el expediente academico y la fotocopia del pago"
    },
    "matriculatedUfs": ["IC1000101", "IC1000102", "IC1000103", "IC1000104", "IC1000105", "IC1000106", "IC1000201", "IC1000202", "IC1000203", "IC1000301", "IC1000303", "IC1000305", "IC1000101", "IC1000102", "IC1000103", "IC1000104", "IC1000105", "IC1000106", "IC1000201", "IC1000202", "IC1000203", "IC1000301", "IC1000303", "IC1000305", "IC1000401", "IC1000402"]
}
</pre>
  
  
  <br><br><h2>DocumentsProfile JSON<h2>
<pre id="jsonProfile">
{
    "arrayDoc": [{
        "name": "Payment"
    }, {
        "name": "DNI"
    }, {
        "name": "Academical expedient"
    }],
    "name": "Basic Profile",
    "description": "Perfil con la imagen del DNI, el expediente academico y la fotocopia del pago"
}
</pre>
  
