import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'
export default class Task extends Component {
  constructor({ min = 0, sec = 0 }) {
    super()
    this.state = {
      newTaskText: '',
      minutes: min,
      seconds: sec,
    }
    this.typeNewTask = (e) => {
      this.setState({ newTaskText: e.target.value })
    }
    this.getNextSecond = () => {
      this.setState(({ minutes, seconds }) => {
        const newState = {}
        if (seconds === 59) {
          newState.seconds = 0
          newState.minutes = minutes + 1
          return newState
        }
        newState.seconds = seconds + 1
        newState.minutes = minutes
        return newState
      })
      console.log('!')
    }
    this.start = () => {
      if (this.timer) this.stop()
      this.timer = setInterval(this.getNextSecond, 1000)
    }
    this.stop = () => {
      clearInterval(this.timer)
    }
  }
  componentWillUnmount() {
    if (this.timer) this.stop()
  }
  render() {
    const { condition, text, deleteTask, id, timer, toggleCompleted, completed, editTask, setEditedTask } = this.props
    const { newTaskText, minutes, seconds } = this.state
    return (
      <li className={completed ? 'completed' : condition}>
        <div className="view">
          <input
            onChange={() => {
              toggleCompleted(id)
              if (this.timer) this.stop()
            }}
            className="toggle"
            type="checkbox"
            checked={completed}
          />
          <label>
            <span className="title">{text}</span>
            <span className="description">
              <button onClick={this.start} className="icon icon-play"></button>
              <button onClick={this.stop} className="icon icon-pause"></button>
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <span className="description">created {formatDistanceToNow(timer, { includeSeconds: true })} ago</span>
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
