import React from 'react'

import './Footer.css'

const Footer = ({ children, tasksLeftCount, clearCompleted }) => {
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

export default Footer
