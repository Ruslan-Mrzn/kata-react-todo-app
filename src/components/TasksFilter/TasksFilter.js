import React from 'react'
import './TasksFilter.css'
const TaskFilter = ({ showAll, viewAll, viewActive, viewCompleted, showActive, showCompleted }) => {
  return (
    <ul className="filters">
      <li>
        <button onClick={showAll} className={viewAll ? 'selected' : ''}>
          All
        </button>
      </li>
      <li>
        <button onClick={showActive} className={viewActive ? 'selected' : ''}>
          Active
        </button>
      </li>
      <li>
        <button onClick={showCompleted} className={viewCompleted ? 'selected' : ''}>
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter
