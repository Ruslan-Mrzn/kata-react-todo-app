import React, { useCallback, useRef, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'
const Task = ({
  min = 0,
  sec = 0,
  condition,
  text,
  deleteTask,
  id,
  timer,
  toggleCompleted,
  completed,
  editTask,
  setEditedTask,
  viewActive,
  viewCompleted,
}) => {
  const [time, setTime] = useState({ minutes: min, seconds: sec })
  const [newTaskText, setNewTaskText] = useState('')

  let taskTimer = useRef(null)

  const typeNewTask = (e) => {
    setNewTaskText(e.target.value)
  }

  const getNextSecond = () => {
    setTime(({ minutes, seconds }) => {
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
  }

  const stop = useCallback(() => {
    if (taskTimer.current) clearInterval(taskTimer.current)
  })

  const start = useCallback(() => {
    stop()
    taskTimer.current = setInterval(getNextSecond, 1000)
  })

  const checkVisibility = () => {
    if (completed && viewActive) return 'hidden'
    if (!completed && viewCompleted) return 'hidden'
  }

  return (
    <li className={`${completed ? 'completed' : condition} ${checkVisibility()}`}>
      <div className="view">
        <input
          onChange={() => {
            toggleCompleted(id)
            if (taskTimer) stop()
          }}
          className="toggle"
          type="checkbox"
          checked={completed}
        />
        <label>
          <span className="title">{text}</span>
          <span className="description">
            <button onClick={start} className="icon icon-play"></button>
            <button onClick={stop} className="icon icon-pause"></button>
            {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
            {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
          </span>
          <span className="description">created {formatDistanceToNow(timer, { includeSeconds: true })} ago</span>
        </label>
        <button onClick={() => editTask(id)} className="icon icon-edit"></button>
        <button
          onClick={() => {
            deleteTask(id)
            stop()
          }}
          className="icon icon-destroy"
        ></button>
      </div>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setEditedTask(id, newTaskText)
            setNewTaskText(e.target.value)
          }
        }}
        onChange={typeNewTask}
        type="text"
        className="edit"
        defaultValue={text}
      />
    </li>
  )
}

export default Task
