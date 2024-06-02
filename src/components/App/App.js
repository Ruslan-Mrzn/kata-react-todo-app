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
      const newTask = { text: text, id: this.taskId++, condition: 'view' }
      console.log(newTask)
      this.setState(({ tasks }) => {
        return {
          tasks: [...tasks, newTask],
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
            {tasks.map(({ text, id, condition }) => (
              <Task key={id} text={text} condition={condition} />
            ))}
          </TaskList>
          <Footer />
        </section>
      </section>
    )
  }
}
