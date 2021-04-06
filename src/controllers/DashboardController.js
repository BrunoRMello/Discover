
const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount =  {
            progress: 0,
            done: 0,
            total:  jobs.length
        }
        // total de horas por dia de cada job em progress
        let jobTotalHours = 0
        
        const updatedJobs = jobs.map((job) => {
            // ajustes no job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress';
            
            statusCount[status] += 1;
            //status = done
            //somando a quantidade de status
            jobTotalHours = status =='progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

                //codigo de baixo foi refatorado para o de cima (refatoracao ternaria')
            //statusCount[status] += 1
           // if (status === 'progress')  
            //jobTotalHours += Number(job['daily-hours'])

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        //qtd de horas que quero trabalhar dias (profile)
        // menos
        // a quantidade de horas/dias de cada job em progress
        const freeHours = profile["hours-per-day"] - jobTotalHours;


        
        return res.render( "index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours})
    }
}