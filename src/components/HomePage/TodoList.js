import React, {Component} from 'react'
import ListItem from './ListItem'
import {connect} from 'react-redux'
import {changeItemValue, selectItem, deselectItem, addItem} from '../../actions/todo.js'


class TodoList extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.todoList.length !== this.props.todoList.length) {
      document.body.scrollTop = document.body.scrollHeight
    }
  }

  handleChangeItemValue = (itemId, newValue) => {
    this.props.changeItemValue(itemId, newValue)

    // Pushes new line to the end if user want's to edit the last item
    if (itemId === this.props.todoList[this.props.todoList.length - 1].id) {
      this.props.addItem()
    }
  }

  handleSelectClick = (itemId, ItemIsDone) => {
    if (ItemIsDone === true) {
      this.props.deselectItem(itemId)
    } else {
      this.props.selectItem(itemId)
    }
  }

  render() {
    const {todoList} = this.props

    return (
      <div className="todo__list">
        <ul>
          { todoList.map((el) => ( <ListItem
            key={el.id}
            ItemId={el.id}
            ItemValue={el.text}
            ItemIsDone={el.done}
            handleChangeItemValue={this.handleChangeItemValue}
            handleSelectClick={this.handleSelectClick}
          />)) }
        </ul>
      </div>
    )
  }
}

export default connect(
  ({todoList}) => ({
    todoList: todoList.toJS()
  }),
  {changeItemValue, selectItem, deselectItem, addItem}
)(TodoList)

