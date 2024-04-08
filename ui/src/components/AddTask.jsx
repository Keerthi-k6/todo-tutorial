import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Typography , Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { API_URL } from '../utils';
const AddTask = ({fetchTasks}) => {
    const [newTask, setNewTask]=useState("")
    const addNewTask=async()=>{
       try{
        await axios.post(API_URL, {name:newTask, completed:false})
        await fetchTasks()
        setNewTask("")
       }
       catch(err)
       {
         console.log(err)
       }
    }
  return (
    <div>
        <Typography align='center' variant="h2" paddingTop={5} paddingBottom={2}>
            My Task List 
        </Typography>
        <div className="addTask">
       <TextField size='small' label="Task" variant="outlined" value={newTask} onChange={(e)=>setNewTask(e.target.value)}/>
       <Button variant='outlined' onClick={addNewTask} disabled={!newTask.length} >
        <AddIcon/>
       </Button>
        </div>
    </div>
  )
}

export default AddTask
