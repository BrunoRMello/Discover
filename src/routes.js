const express = require('express');
//camiho da rota
const routes = express.Router()

const views = __dirname + "/views/"


const Profile = {
    data:
        {
            name: "Bruno",
            avatar: "https://avatars.githubusercontent.com/u/59987398?v=4",
            "monthly-budget": 3000,
            "days-per-week": 5,
            "hours-per-day": 5,
            "vacation-per-year": 4,
            "value-hour": 75
        },
        controllers:{
            index(req, res) {
             return   res.render(views + "profile", { profile: Profile.data })
            },

            update(req, res) {
                //req.body  para pegar os dados
                const data= req.body
                //definir quantas semanas tem num ano
                const weeksPerYear = 52
            
                //remover as semanas de ferias do ano
                const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) /12
                
                //total horas por semana estou trabalhando
                const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
                //total de horas trabalhadas no mes

                const monthlyTotalHours = weekTotalHours * weeksPerMonth

                // o valor da minha hora

               const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

                Profile.data = {
                    ...Profile.data,
                    ...req.body,
                    "value-hour": valueHour
                }
                return res.redirect('/profile')
            }
        }
        
    }

const Job = {
    data:[
        
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours":2,
        "total-hours": 1,
        created_at: Date.now(),
    }, {
        id: 2,
        name: "OneTwo Project",
        "daily-hours":3,
        "total-hours": 47,
        created_at: Date.now(),
    }
    ],
    controllers:{
        index(req, res) {
                  const updateJobs = Job.data.map((job) => {
                //ajustes no job, como calculo de tempo
                    const remaining = Job.services.remainingDays(job);
                    const status = remaining <= 0 ? 'done' : 'progress'
            
                    return {
                        ...job,
                        remaining,
                        status,
                        budget: Profile.data["value-hour"] * job["total-hours"]
                    }
                })
                //ajustes no job, como calculo de tempo  
                
            return res.render(views + "index", {jobs: updateJobs })            
        },

        create(req, res) {
            return res.render(views + "job")
        },

        save(req, res) {
        //req.body = {  name: 'Bruno Rodrigues de Mello', 'daily-hours': '2',  'total-hours' '2'}
         const lastId = Job.data[Job.data.length - 1]?.id || 1;

        Job.data.push({
         id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        create_at: Date.now()
  })
    return res.redirect('/')
        },

        show(req, res) {
            const jobId = req.params.id
            const job =Job.data.find(job => job.id === jobId) 
          return  res.render(views + "job-edit", {job})
        }
    },

    
    services: {
        remainingDays(job) {
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
                
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateInMs - Date.now()
            //transformar milisegundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            //restam xx dias
        
            return dayDiff
        
        }
    }
}


//Quando o server Rodar ele vai executar uma função





routes.get('/', Job.controllers.index)
routes.get('/job',  Job.controllers.create)
routes.post('/job', Job.controllers.save) 
routes.get('/job/:id', Job.controllers.show)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)



module.exports = routes;