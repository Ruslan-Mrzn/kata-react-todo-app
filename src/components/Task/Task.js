import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'
export default class Task extends Component {
  constructor() {
    super()
    this.state = {
      newTaskText: '',
    }
    this.typeNewTask = (e) => {
      this.setState({ newTaskText: e.target.value })
    }
  }
  render() {
    const { condition, text, deleteTask, id, timer, toggleCompleted, completed, editTask, setEditedTask } = this.props
    const { newTaskText } = this.state
    return (
      <li className={completed ? 'completed' : condition}>
        <div className="view">
          <input onChange={() => toggleCompleted(id)} className="toggle" type="checkbox" checked={completed} />
          <label>
            <span className="description">{text}</span>
            <span className="created">created {formatDistanceToNow(timer, { includeSeconds: true })} ago</span>
          </label>
          <button onClick={() => editTask(id)} className="icon icon-edit"></button>
          <button onClick={() => deleteTask(id)} className="icon icon-destroy"></button>
        </div>
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditedTask(id, newTaskText)
              this.setState({ newTaskText: e.target.value })
            }
          }}
          onChange={this.typeNewTask}
          type="text"
          className="edit"
          defaultValue={text}
        />
      </li>
    )
  }
}
