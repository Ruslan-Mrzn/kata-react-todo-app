import React, { Component } from 'react'

import './Footer.css'

export default class Footer extends Component {
  render() {
    const { children, tasksLeftCount, clearCompleted } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{tasksLeftCount} items left</span>
        {children}
        <button onClick={clearCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    )
  }
}
