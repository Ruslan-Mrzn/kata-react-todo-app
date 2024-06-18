import React, { useState } from 'react'
import './NewTaskForm.css'
const NewTaskForm = ({ createNewTask }) => {
  const [newTaskText, setNewTaskText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const typeNewTask = (e) => {
    setNewTaskText(e.target.value)
  }

  const typeMin = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
    setMin(+e.target.value)
  }

  const typeSec = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
    if (e.target.value > 59) e.target.value = ''
    setSec(+e.target.value)
  }

  return (
    <form className="new-todo-form">
      <input
        onChange={typeNewTask}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            createNewTask(newTaskText, min, sec)
            setNewTaskText('')
            setMin('')
            setSec('')
          }
        }}
        value={newTaskText}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
      <input
        onChange={typeMin}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            createNewTask(newTaskText, min, sec)
            setNewTaskText('')
            setMin('')
            setSec('')
          }
        }}
        className="new-todo-form__timer"
        value={min}
        placeholder="Min"
      />
      <input
        onChange={typeSec}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            createNewTask(newTaskText, min, sec)
            setNewTaskText('')
            setMin('')
            setSec('')
          }
        }}
        className="new-todo-form__timer"
        value={sec}
        placeholder="Sec"
      />
    </form>
  )
}

export default NewTaskForm
