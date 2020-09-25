import React, { Component } from 'react';

import AppHeader from "../app-header";
import SearchPannel from "../search-pannel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import './app.css'
import ItemAddForm from "../item-add-form";

export default class App extends Component {
  maxId = 100;
  state = {
    todoDate: [
      this.createTodoItem('Drink coffe'),
      this.createTodoItem('Make awesome app'),
      this.createTodoItem('Have a lunch'),
    ],
    term:'',
    condition: 'All'
  };


  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoDate}) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const newArray = [...todoDate.slice(0, idx), ...todoDate.slice(idx + 1)];
      return {
        todoDate: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({todoDate}) => {
      const newArray = [...todoDate, newItem];
      return {
        todoDate: newArray
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({todoDate}) => {
      return {
        todoDate: this.toggleProperty(todoDate, id, 'important')
      }
    })
  };

  onToggleDone = (id) => {
    this.setState(({todoDate}) => {
      return {
        todoDate: this.toggleProperty(todoDate, id, 'done')
      }
    })
  };

  search(items, term) {
    if (term.length === 0) {
      return  items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  onSearchChange = (term) => {
    this.setState({term});
  };

  filter(items, condition) {
    if (condition === 'All') {
      return items
    } else if (condition === 'Done') {
      return items.filter((item) => {
        return item.done === true
      })
    } else if (condition === 'Active') {
      return items.filter((item) => {
        return item.done === false
      })
    }
  }

  onConditionChange = (condition) => {
    this.setState({condition});
  }

  render() {
    const {todoDate, term, condition} = this.state
    const visibleItems = this.filter(
      this.search(todoDate, term), condition)
    const doneCount = todoDate.filter((el) => el.done).length;
    const todoCount = todoDate.length - doneCount
    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className='top-pannel d-flex'>
          <SearchPannel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter onConditionChange={this.onConditionChange}
                            condition={condition}/>

        </div>

        <TodoList todos={visibleItems}
                  onDeleted={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleDone={this.onToggleDone}
                  key={this.key}/>
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};




