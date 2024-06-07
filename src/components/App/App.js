import React, { Component } from 'react'

import './App.css'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Task from '../Task/Task'
import TaskFilter from '../TasksFilter/TasksFilter'
import Footer from '../Footer/Footer'
export default class Api extends Component {
  constructor() {
    super()
    this.taskId = 0
    this.state = {
      tasks: [],
      viewAll: true,
      viewCompleted: false,
      viewActive: false,
    }
    this.createNewTask = (text, min, sec) => {
      const newTask = {
        timer: Date.now(),
        text: text,
        min: min === '' ? 0 : min,
        sec: sec === '' ? 0 : sec,
        id: this.taskId++,
        condition: 'view',
        completed: false,
      }
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
    this.showAll = () => this.setState({ viewAll: true, viewActive: false, viewCompleted: false })
    this.showActive = () => this.setState({ viewAll: false, viewActive: true, viewCompleted: false })
    this.showCompleted = () => this.setState({ viewAll: false, viewActive: false, viewCompleted: true })
    this.mapTasks = (array) =>
      array.map(({ text, min, sec, id, condition, completed, timer }) => (
        <Task
          toggleCompleted={this.toggleCompleted}
          deleteTask={this.deleteTask}
          id={id}
          key={id}
          text={text}
          min={min}
          sec={sec}
          condition={condition}
          completed={completed}
          editTask={this.editTask}
          setEditedTask={this.setEditedTask}
          timer={timer}
        />
      ))
    this.clearCompleted = () =>
      this.setState(({ tasks }) => {
        return {
          tasks: tasks.filter(({ completed }) => !completed),
        }
      })
  }

  render() {
    const { tasks, viewAll, viewActive, viewCompleted } = this.state
    const tasksLeftCount = tasks.filter(({ completed }) => !completed).length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm createNewTask={this.createNewTask} />
        </header>
        <section className="main">
          <TaskList>
            {viewAll
              ? this.mapTasks(tasks)
              : viewActive
                ? this.mapTasks(tasks.filter(({ completed }) => !completed))
                : this.mapTasks(tasks.filter(({ completed }) => completed))}
          </TaskList>
          <Footer tasksLeftCount={tasksLeftCount} clearCompleted={this.clearCompleted}>
            <TaskFilter
              viewAll={viewAll}
              viewActive={viewActive}
              viewCompleted={viewCompleted}
              showAll={this.showAll}
              showActive={this.showActive}
              showCompleted={this.showCompleted}
            />
          </Footer>
        </section>
      </section>
    )
  }
}
