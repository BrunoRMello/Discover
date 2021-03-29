// Create Server 
const express = require('express');
const server = express();
const routes = require("./routes");

//usando template engine
server.set('view engine', 'ejs')

//Habilitar arquivos statics
server.use(express.static("public"))

// chamar routes
server.use(routes);


server.listen(3000, () => console.log('Sever Rodando'));
