import React, { Component } from 'react'
import './NewTaskForm.css'
export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = { newTaskText: '' }
    this.typeNewTask = (e) => {
      this.setState({ newTaskText: e.target.value })
    }
  }
  render() {
    const { createNewTask } = this.props
    const { newTaskText } = this.state
    return (
      <input
        onChange={this.typeNewTask}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            createNewTask(newTaskText)
            this.setState({ newTaskText: '' })
          }
        }}
        value={this.state.newTaskText}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    )
  }
}
