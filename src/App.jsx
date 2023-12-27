import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import './App.css';

export default function App() {
  const [item, setItem] = useState('');
  const [todolist, setTodolist] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const onChangeSearch = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    if (newSearch === '') {
      setFilteredUsers([]);
    } else {
      const filteredList = todolist.filter((test) =>
        test.taskName.toLowerCase().includes(newSearch.toLowerCase())
      );
      setFilteredUsers(filteredList);
    }
  };

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const addTask = () => {
    
    const newTask = {
      id: todolist.length > 0 ? todolist[todolist.length - 1].id + 1 : 1,
      taskName: item,
      done: false,
    };
    setTodolist([...todolist, newTask]);
    setItem('');
  };

  const deleteTask = (id) => {
    setTodolist(todolist.filter((task) => task.id !== id));
  };

  const completedTask = (id) => {
    setTodolist(
      todolist.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="art">
      <Paper elevation={20} >
        <div  className="art2"  >
        <Typography variant="h4" style={{ fontFamily: 'Dancing Script' }}>
          To-Do
        </Typography>
        <Input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={onChangeSearch}
        />
        <ul>
          {filteredUsers.map((test) => (
            <p key={test.id}> {test.taskName}</p>
          ))}
        </ul>
        <div className="art3">
          <Input
            type="text"
            value={item}
            placeholder="Enter Task"
            onChange={handleChange}
          />
        </div>
        <br />
        <Button style={{ backgroundColor: "#8c7676"}}
          variant="contained" onClick={addTask}>
          Add
        </Button>
          </div>
      </Paper>
      <br />
      <Paper elevation={20} >
        <div className="art4">
        <Typography variant="h5" style={{ fontFamily: 'Dancing Script' }}>
          Tasks
        </Typography>
          <br/>
        {todolist.map((task) => (
          <div key={task.id}>
            <Typography variant="h6">  {task.taskName} </Typography>
          
            
            <Button
              style={{
                backgroundColor: task.done ? '#f0ffbf' : '',
                border: task.done ? '1px solid black' : '1px solid black',
              }}
              onClick={() => completedTask(task.id)}
            >
              completed
            </Button>
            <IconButton onClick={() => deleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
            <hr></hr>
          </div>
        ))}
        </div>
      </Paper>
    </div>
  );
}
