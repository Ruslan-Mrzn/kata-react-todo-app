import React, { Component } from 'react'
import './NewTaskForm.css'
export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = { newTaskText: '', min: '', sec: '' }
    this.typeNewTask = (e) => {
      this.setState({ newTaskText: e.target.value })
    }
    this.typeMin = (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
      this.setState({ min: +e.target.value })
    }
    this.typeSec = (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
      if (e.target.value > 59) e.target.value = ''
      this.setState({ sec: +e.target.value })
    }
  }
  render() {
    const { createNewTask } = this.props
    const { newTaskText, min, sec } = this.state
    return (
      <form className="new-todo-form">
        <input
          onChange={this.typeNewTask}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createNewTask(newTaskText, min, sec)
              this.setState({ newTaskText: '', min: '', sec: '' })
            }
          }}
          value={this.state.newTaskText}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
        <input
          onChange={this.typeMin}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createNewTask(newTaskText, min, sec)
              this.setState({ newTaskText: '', min: '', sec: '' })
            }
          }}
          className="new-todo-form__timer"
          value={this.state.min}
          placeholder="Min"
        />
        <input
          onChange={this.typeSec}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createNewTask(newTaskText, min, sec)
              this.setState({ newTaskText: '', min: '', sec: '' })
            }
          }}
          className="new-todo-form__timer"
          value={this.state.sec}
          placeholder="Sec"
        />
      </form>
    )
  }
}
