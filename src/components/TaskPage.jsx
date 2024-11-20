import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import './TaskPage.css'
import EditLogo from '../assets/edit.svg'
import DeleteLogo from '../assets/delete.svg'

function TaskPage(){
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos])
  
  const handleChange = (e)=>{
    setTodo(e.target.value);
  }

  const handleToggleComplete = (id)=>{
    const index = todos.findIndex(item => item.id === id);
    let newTodos = todos;
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos([...newTodos]);
  }

  const handleEdit = (id)=>{
    const index = todos.findIndex(item => item.id === id);
    setTodo(todos[index].todo);
    handleDelete(id);
  }

  const handleDelete = (id)=>{
    let newTodos = todos.filter(item => item.id !== id);
    setTodos([...newTodos]);
  }

  const handleSave = ()=>{
    setTodos([...todos,{id:uuidv4(), todo, isCompleted:false}]);
    setTodo("");
  }

  return (
    <div className='task-page-container'>
        <h1>iTask - Manage your todos at one place</h1>
        <div className="add-todo-container">
          <h2>Add a Todo</h2>
          <div className="input-save-container">
            <input type="text" value={todo} placeholder='Enter your task' onChange={handleChange}/>
            <button id='save-button' onClick={handleSave} disabled={!todo.trim()}>Save</button>
          </div>
        </div>
        <div className='view-todos-container'>
          <div className="show-finished-container">
            <input type="checkbox" id='show-finished' checked={showFinished} onChange={() => setShowFinished(!showFinished)}/>
            <label htmlFor="show-finished">Show Finished</label>
          </div>
          <div className="section-line"></div>
          <div className="your-todos-container">
            <h2>Your Todos</h2>
            <div className="todos-list-container">
              {todos.length == 0 && <div>No todos to display!</div>}
              {
                todos.map((todo)=>{
                  if(!todo.isCompleted || showFinished){
                    return (
                      <div className="todo" key={todo.id}>
                        <input type="checkbox" checked={todo.isCompleted} onChange={() => handleToggleComplete(todo.id)}/>
                        <p className={todo.isCompleted ? 'todo-completed' : ''}>{todo.todo}</p>
                        <button id='edit-button' onClick={() => handleEdit(todo.id)}><img src={EditLogo} alt="Edit"/></button>
                        <button id='delete-button' onClick={() => handleDelete(todo.id)}><img src={DeleteLogo} alt="Delete"/></button>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default TaskPage