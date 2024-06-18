import React, { useState } from 'react'

import './App.css'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Task from '../Task/Task'
import TaskFilter from '../TasksFilter/TasksFilter'
import Footer from '../Footer/Footer'
const App = () => {
  const [tasks, setTasks] = useState([])
  const [viewAll, setViewAll] = useState(true)
  const [viewActive, setViewActive] = useState(false)
  const [viewCompleted, setViewCompleted] = useState(false)
  const [taskId, setTaskId] = useState(0)

  const tasksLeftCount = tasks.filter(({ completed }) => !completed).length

  const createNewTask = (text, min, sec) => {
    const newTask = {
      timer: Date.now(),
      text: text,
      min: min === '' ? 0 : min,
      sec: sec === '' ? 0 : sec,
      id: taskId,
      condition: 'view',
      completed: false,
    }
    setTasks((tasks) => [...tasks, newTask])
    setTaskId((i) => i + 1)
  }

  const deleteTask = (taskId) => {
    setTasks((tasks) => {
      const index = tasks.findIndex(({ id }) => id === taskId)
      return [...tasks.slice(0, index), ...tasks.slice(index + 1)]
    })
  }

  const toggleCompleted = (taskId) => {
    setTasks((tasks) => {
      const index = tasks.findIndex(({ id }) => id === taskId)
      const markedTask = { ...tasks[index], completed: !tasks[index].completed }
      return [...tasks.slice(0, index), markedTask, ...tasks.slice(index + 1)]
    })
  }

  const editTask = (taskId) => {
    setTasks((tasks) => {
      const index = tasks.findIndex(({ id }) => id === taskId)
      const editingTask = { ...tasks[index], condition: 'editing' }
      return [...tasks.slice(0, index), editingTask, ...tasks.slice(index + 1)]
    })
  }

  const setEditedTask = (taskId, newText) => {
    setTasks((tasks) => {
      const index = tasks.findIndex(({ id }) => id === taskId)
      const editedTask = { ...tasks[index], text: newText, condition: 'view' }
      return [...tasks.slice(0, index), editedTask, ...tasks.slice(index + 1)]
    })
  }

  const clearCompleted = () =>
    setTasks((tasks) => {
      return tasks.filter(({ completed }) => !completed)
    })

  const showAll = () => {
    setViewAll(true)
    setViewActive(false)
    setViewCompleted(false)
  }

  const showActive = () => {
    setViewAll(false)
    setViewActive(true)
    setViewCompleted(false)
  }

  const showCompleted = () => {
    setViewAll(false)
    setViewActive(false)
    setViewCompleted(true)
  }

  const mapTasks = (array) =>
    array.map(({ text, min, sec, id, condition, completed, timer }) => (
      <Task
        toggleCompleted={toggleCompleted}
        deleteTask={deleteTask}
        id={id}
        key={id}
        text={text}
        min={min}
        sec={sec}
        condition={condition}
        completed={completed}
        editTask={editTask}
        setEditedTask={setEditedTask}
        timer={timer}
        viewAll={viewAll}
        viewActive={viewActive}
        viewCompleted={viewCompleted}
      />
    ))

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm createNewTask={createNewTask} />
      </header>
      <section className="main">
        <TaskList>{mapTasks(tasks)}</TaskList>
        <Footer tasksLeftCount={tasksLeftCount} clearCompleted={clearCompleted}>
          <TaskFilter
            viewAll={viewAll}
            viewActive={viewActive}
            viewCompleted={viewCompleted}
            showAll={showAll}
            showActive={showActive}
            showCompleted={showCompleted}
          />
        </Footer>
      </section>
    </section>
  )
}

export default App
