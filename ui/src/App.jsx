import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddTask from './components/AddTask';
import Task from './components/Task';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { API_URL } from './utils';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [tasks, setTasks] = useState([])
  const fetchTasks = async () => {
    try{
       const {data} = await axios.get(API_URL)
       setTasks(data)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  useEffect(()=>
{
  fetchTasks()
},[])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
        <AddTask fetchTasks={fetchTasks}/>
        {
        tasks.map((task)=>
      {
        return <Task task={task} key = {task.id} fetchTasks={fetchTasks}/>

      })
      }
    </ThemeProvider>
  );
}
