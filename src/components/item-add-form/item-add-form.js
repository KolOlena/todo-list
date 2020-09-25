import React, { Component } from "react";
import './item-add-form.css';


export default class ItemAddForm extends Component {
  errorPlaceholder = 'Please, enter item one more time'

  state = {
    label: '',
    placeholder: 'What needs to be done'
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {

    if (this.state.label === '') {
      e.preventDefault();
      this.setState(
        {placeholder: this.errorPlaceholder}
      )
    } else {
      e.preventDefault();
      this.props.onItemAdded(this.state.label)
      this.setState(
        {label: ''}
      )
    }
  };

  render() {
    return (
      <form className={'item-add-form d-flex'}
            onSubmit={this.onSubmit}>

        <input type='text'
               className={'form-control error'}
               onChange={this.onLabelChange}
               placeholder={this.state.placeholder}
               value={this.state.label}
        />

        <button className='btn btn-outline-secondary'>
          Add
        </button>
      </form>
    );
  }
};

