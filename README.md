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
  <h2> **CICLES** </h2>
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
</th><tr><td></td><td></td><td>Se debe informar de un objeto JSON de grado entero, igual que el de base de datos. <a href="#jsonGrade">Ejemplo</a></td></tr></tr>
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
  
