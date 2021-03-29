const express = require('express');
//camiho da rota
const routes = express.Router()

const views = __dirname + "/views/"


const profile = {
    name: "Bruno",
    avatar: "https://avatars.githubusercontent.com/u/59987398?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4,
};


//Quando o server Rodar ele vai executar uma função
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))



module.exports = routes;