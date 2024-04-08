import React, { useState } from 'react'
import {Checkbox,Typography,Button} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateTask from './UpdateTask';
import classnames from 'classnames'
import axios from 'axios';
import { API_URL } from '../utils';
const Task = ({task,fetchTasks}) => {
    const {id,name,completed}=task
    const [isCompleted, setIsCompleted]=useState(completed)
    const [isDialogueOpen, setIsDialogueOpen]=useState(false)
    const handleDeleteTask=async()=>{
        try{
         await axios.delete(`${API_URL}/${task.id}`)
         await fetchTasks()
        }catch(err)
        {
            console.log(err)
        }
    }
    const handleTaskCompletion=async()=>{
        try{
            await axios.put(API_URL,{

                id:id,
                name:name,
                completed:!isCompleted
            })
            setIsCompleted((prev)=>!prev)
        }
        catch(err)
        {
            console.log(err)
        }
    }
  return (

    <div className='task'>
        <div className={classnames("flex",
    {
        done:isCompleted
    })}>
    <Checkbox checked={isCompleted} onChange={handleTaskCompletion}/>
        <Typography variant="h3" >
         {name}
        </Typography>  
        </div>
        <div className="taskButtons">
    <Button variant='contained' onClick={()=>setIsDialogueOpen(true)}>
        <EditIcon/>
    </Button>
    <Button variant='contained' onClick={handleDeleteTask}color='error'>
        <DeleteIcon/>
    </Button>
    </div>
    <UpdateTask isDialogueOpen={isDialogueOpen} setIsDialogueOpen={setIsDialogueOpen} task={task} fetchTasks={fetchTasks}/>
    </div>
  )
}

export default Task
