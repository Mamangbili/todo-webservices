<h1>Todo Webservice</h1>
Service domain yang digunakan :
https://todos-api.nutripal.site/
<h2>Endpoint</h2>
<hr>

<h3>Register</h3>
<p>POST        : https://todos-api.nutripal.site/register</p>
<p>body option : {username,password}</p>
<hr>

<h3>Login</h3>
<p>POST        : https://todos-api.nutripal.site/login</p>
<p>body option : {username,password}</p>
<hr>


<h3>Todos</h3>
<h4>Butuh Authorization. user hanya dapat menggunakan endpoint pada resourcenya sendiri</h4>
<h5>Get all todos</h5>

```
GET          : https://todos-api.nutripal.site/todos
```
<h5>Get todo detail</h5>

```
GET          : https://todos-api.nutripal.site/todos/:id
```
<h5>create todo</h5>

```
POST        : https://todos-api.nutripal.site/todos/
body option : {todo,description}
```
<h5>update todo</h5>

```
PUT         : https://todos-api.nutripal.site/todos/:id
body option : {todo,description}
```
<h5>delete one todo</h5>

```
DELETE      : https://todos-api.nutripal.site/todos/:id
```
<h5>delete many todos</h5>

```
DELETE      : https://todos-api.nutripal.site/todos/
body option : {idList:[]}
```
<h5>delete all todos</h5>

```
DELETE  : https://todos-api.nutripal.site/todos/
```
                                                        

