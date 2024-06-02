import React, { Component } from 'react'

import './App.css'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
// import Task from '../Task/Task'
import Footer from '../Footer/Footer'
export default class Api extends Component {
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList>{/* <Task /> */}</TaskList>
          <Footer />
        </section>
      </section>
    )
  }
}
