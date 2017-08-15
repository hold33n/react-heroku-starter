import React from 'react'
import ScrollToTopOnMount from '../ScrollToTopOnMount'
import TodoList from './TodoList'

const Todo = () =>
  <section className='todo'>
    <div className="container">
      <ScrollToTopOnMount />
      <h1>Hello world!</h1>
      <p>It's a todo-app that reproduces a simple Redux cycle</p>
      <TodoList/>
    </div>
  </section>


export default Todo
