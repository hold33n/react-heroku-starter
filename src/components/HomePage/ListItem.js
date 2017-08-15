import React, {PropTypes, Component} from 'react'
import classNames from 'classnames'


export default class ListItem extends Component {
  static propTypes = {
    ItemId: PropTypes.number.isRequired,
    ItemValue: PropTypes.string.isRequired,
    ItemIsDone: PropTypes.bool.isRequired,
    handleChangeItemValue: PropTypes.func.isRequired,
    handleSelectClick: PropTypes.func.isRequired
  };

  render() {
    const {ItemId, ItemValue, ItemIsDone, handleChangeItemValue, handleSelectClick} = this.props

    const checkboxClassName = classNames('todo__checkbox', {
      'todo__checkbox--visible': (ItemValue.length > 0),
      'todo__checkbox--selected': (ItemIsDone === true)
    })

    const todoItemClassName = classNames('todo__item', {
      'todo__item--selected': (ItemIsDone === true)
    })

    const inputDisabled = (ItemIsDone === true) ? true : false

    return (
      <li className={todoItemClassName} onClick={this.toggleListItemClick}>
        <div
          className={checkboxClassName}
          onClick={ () => {
            handleSelectClick(ItemId, ItemIsDone)
          } }>
          <span></span>
        </div>
        <input
          className='todo__input'
          type="text"
          ref={(ref) => this.todoInput = ref}
          value={ItemValue}
          onChange={(e) => {
            handleChangeItemValue(ItemId, e.target.value)
          }}
          disabled={inputDisabled} />
      </li>
    )
  }
}




