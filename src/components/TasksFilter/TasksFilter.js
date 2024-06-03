import React, { Component } from 'react'
import './TasksFilter.css'
export default class TaskFilter extends Component {
  render() {
    const { showAll, viewAll, viewActive, viewCompleted, showActive, showCompleted } = this.props
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
}
