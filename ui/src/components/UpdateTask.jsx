import React, { useState } from 'react'
import { Dialog, DialogTitle ,TextField, Button} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import  axios  from 'axios';
import { API_URL } from '../utils';
const UpdateTask = ({isDialogueOpen,setIsDialogueOpen,task,fetchTasks }) => {
    const {id,completed}=task
    const [taskName,setTaskName]=useState("")
    const updateTask=async()=>{
      try {
        await axios.put(API_URL, {
          id:id,
          name:taskName,
          completed:completed
        })
        await fetchTasks()
        setTaskName("")
      } catch (err) {
        console.log(err)
      }
    }
  return (
     <Dialog open={isDialogueOpen}>
       <DialogTitle>
        Edit Task
       </DialogTitle>
          <div className="dialog">

            <TextField size='small' label="Task" variant="outlined" onChange={(e)=>setTaskName(e.target.value)}/>
            <Button variant='contained' onClick={async()=>
              { await updateTask();
                setIsDialogueOpen(false)}}>
                <CheckIcon/>
            </Button>
          </div>
     </Dialog>
  )
}

export default UpdateTask
