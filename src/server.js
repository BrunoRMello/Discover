// Create Server 
const express = require('express');
const server = express();
const routes = require("./routes");
const path = require("path");

//usando template engine
server.set('view engine', 'ejs')

//mudar a localizacao da pasta views
server.set('views', path.join(__dirname, 'views'))

//Habilitar arquivos statics
server.use(express.static("public"))


//usar o req.body 
server.use(express.urlencoded({ extended: true }))

// chamar routes
server.use(routes);


server.listen(3000, () => console.log('Sever Rodando'));
