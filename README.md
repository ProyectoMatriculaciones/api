--------------------------------
****ENDPOINTS DOCUMENTATION****:
--------------------------------

<h2>Alumn Login<h2>
<h3>REQUEST</h3>
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
<h3>RESPONSE</h3>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response
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
  
  
  <h2>Admin Login<h2>
<h3>REQUEST</h3>
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
<h3>RESPONSE</h3>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response
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
