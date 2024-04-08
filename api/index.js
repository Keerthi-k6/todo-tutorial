import express from 'express'
import { createTask, updateTasks , fetchTasks, deleteTasks} from './task.js';
import ServerlessHttp from 'serverless-http';
import cors from 'cors';
const app = express()
if(process.env.DEVELOPMENT){
    app.use(cors());
}
const port = 3000
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/task', async(req, res) => {
  try {
    const tasks = await fetchTasks();
    res.send(tasks.Items);
  }
  catch(err)
  {
    res.status(400).send(`Error while fetching tasks : ${err}`);
  }
})
app.post('/task', async(req, res) => {
     try {
        const task = req.body;
        const response = await createTask(task);
        res.send(response);
     }
     catch(err)
     {
        res.status(400).send(`Error while creating task : ${err}`);
     }
})
app.put('/task', async(req, res) => {
    try {
        const task = req.body;
        const response = await updateTasks(task);
        res.send(response);
     }
     catch(err)
     {
        res.status(400).send(`Error while updating task : ${err}`);
     }
})
app.delete('/task/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const response = await deleteTasks(id);
        res.send(response);
     }
     catch(err)
     {
        res.status(400).send(`Error while deleting task : ${err}`);
     }
})

if(process.env.DEVELOPMENT)
{
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

}
export const handler = ServerlessHttp(app)