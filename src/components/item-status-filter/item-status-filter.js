import React, { Component } from "react";
import './item-status-filter.css'

export default class ItemStatusFilter extends Component {
  buttons = [
    {name: 'All', label: 'All'},
    {name: 'Active', label: 'Active'},
    {name: 'Done', label: 'Done'}
  ]

  state = {
    condition: 'All'
  }

  getStatus = (status) => {
    this.setState({condition: status});
    this.props.onConditionChange(status);
  };

  render() {
    const {condition} = this.props
    const buttons = this.buttons.map(({name, label}) => {
      const isActive = condition === name;
      let className = 'btn';
      if (isActive) {
        className += ' btn-info'
      } else {
        className += ' btn-outline-secondary'
      }
      return (
        <button type='button'
                className={className}
                onClick={() => this.getStatus(name)}
                key={name}>
          {label}</button>
      )
    })

    return (
      <div className='btn-group'>
        {buttons}
      </div>
    );
  }
}





