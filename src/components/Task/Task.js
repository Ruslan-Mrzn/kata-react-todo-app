import React, { Component } from 'react'
import './Task.css'
export default class Task extends Component {
  render() {
    const { condition, text } = this.props
    return (
      <li className={condition}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{text}</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        <input type="text" className="edit" value={text} />
      </li>
    )
  }
}
