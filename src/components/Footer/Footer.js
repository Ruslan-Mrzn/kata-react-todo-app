import React, { Component } from 'react'

import './Footer.css'
import TaskFilter from '../TasksFilter/TasksFilter'
export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">1 items left</span>
        <TaskFilter />
        <button className="clear-completed">Clear completed</button>
      </footer>
    )
  }
}
