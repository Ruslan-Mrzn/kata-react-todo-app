import React, { Component } from 'react'

import './TaskList.css'
export default class TaskList extends Component {
  render() {
    const { children } = this.props
    return <ul className="todo-list">{children}</ul>
  }
}
