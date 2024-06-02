import React, { Component } from 'react'

import './App.css'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Task from '../Task/Task'
import Footer from '../Footer/Footer'
export default class Api extends Component {
  constructor() {
    super()
    this.taskId = 0
    this.state = {
      tasks: [],
    }
    this.createNewTask = (text) => {
      const newTask = { text: text, id: this.taskId++, condition: 'view', completed: false }
      console.log(newTask)
      this.setState(({ tasks }) => {
        return {
          tasks: [...tasks, newTask],
        }
      })
    }
    this.deleteTask = (taskId) => {
      this.setState(({ tasks }) => {
        const index = tasks.findIndex(({ id }) => id === taskId)
        return {
          tasks: [...tasks.slice(0, index), ...tasks.slice(index + 1)],
        }
      })
    }
    this.toggleCompleted = (taskId) => {
      this.setState(({ tasks }) => {
        const index = tasks.findIndex(({ id }) => id === taskId)
        const markedTask = { ...tasks[index], completed: !tasks[index].completed }
        return {
          tasks: [...tasks.slice(0, index), markedTask, ...tasks.slice(index + 1)],
        }
      })
    }
    this.editTask = (taskId) => {
      this.setState(({ tasks }) => {
        const index = tasks.findIndex(({ id }) => id === taskId)
        const editingTask = { ...tasks[index], condition: 'editing' }
        return {
          tasks: [...tasks.slice(0, index), editingTask, ...tasks.slice(index + 1)],
        }
      })
    }
    this.setEditedTask = (taskId, newText) => {
      this.setState(({ tasks }) => {
        const index = tasks.findIndex(({ id }) => id === taskId)
        const editedTask = { ...tasks[index], text: newText, condition: 'view' }
        return {
          tasks: [...tasks.slice(0, index), editedTask, ...tasks.slice(index + 1)],
        }
      })
    }
  }

  render() {
    const { tasks } = this.state
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm createNewTask={this.createNewTask} />
        </header>
        <section className="main">
          <TaskList>
            {tasks.map(({ text, id, condition, completed }) => (
              <Task
                toggleCompleted={this.toggleCompleted}
                deleteTask={this.deleteTask}
                id={id}
                key={id}
                text={text}
                condition={condition}
                completed={completed}
                editTask={this.editTask}
                setEditedTask={this.setEditedTask}
              />
            ))}
          </TaskList>
          <Footer />
        </section>
      </section>
    )
  }
}
