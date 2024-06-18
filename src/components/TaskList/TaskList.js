import React from 'react'

import './TaskList.css'
const TaskList = ({ children }) => {
  return <ul className="todo-list">{children}</ul>
}

export default TaskList
