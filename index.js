const jayson = require('jayson/promise')
const shortid = require('shortid')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// use this function to simulate database i/o
const delay = duration => new Promise(resolve => setTimeout(resolve, duration))

class Todo {
  constructor(todo) {
    this.name = todo.name
    this.description = todo.description || ''
    this.id = todo.id || shortid.generate()
    this.checked = todo.checked || false
    this.archived = todo.archived || false
  }
}

const todoList = []

const getTodoList = async args => {
  await delay(500)
  return todoList
}

const getTodo = async args => {
  await delay(500)
  const index = todoList.findIndex(todo => todo.id === args.id)
  return todoList[index]
}

const addTodo = async args => {
  await delay(500)
  const newTodo = new Todo(args)
  todoList.push(newTodo)
  return newTodo
}

const updateTodo = async args => {
  await delay(500)
  const existingTodoIndex = todoList.findIndex(todo => todo.id === args.id)
  const existingTodo = todoList[existingTodoIndex]
  todoList[existingTodoIndex] = { ...existingTodo, ...args }
  return todoList[existingTodoIndex]
}

const deleteTodo = async args => {
  await delay(500)
  const index = todoList.findIndex(todo => todo.id === args.id)
  todoList.splice(index, 1)
  return todoList
}

const checkTodo = async args => {
  await delay(500)
  const index = todoList.findIndex(todo => todo.id === args.id)
  todoList[index].checked = true
  return todoList[index]
}

const uncheckTodo = async args => {
  await delay(500)
  const index = todoList.findIndex(todo => todo.id === args.id)
  todoList[index].checked = false
  return todoList[index]
}

const archiveTodo = async args => {
  await delay(500)
  const index = todoList.findIndex(todo => todo.id === args.id)
  todoList[index].archived = true
  return todoList[index]
}

const unarchiveTodo = async args => {
  await delay(500)
  const index = todoList.findIndex(todo => todo.id === args.id)
  todoList[index].archived = false
  return todoList[index]
}

const server = jayson.server({
  getTodoList,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  checkTodo,
  uncheckTodo,
  archiveTodo,
  unarchiveTodo
})

app.use(cors({methods: ['POST']}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(server.middleware())

app.listen(3005, () => {
  console.log('App is listening on port 3005')
})
