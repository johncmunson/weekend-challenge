const jayson = require('jayson')
const shortid = require('shortid')
// const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

class Todo {
	constructor(todo) {
		this.description = todo.description || ''
		this.id = todo.id || shortid.generate()
		this.checked = todo.checked || false
		this.archived = todo.archived || false
	}
}

const todoList = []

const getTodoList = (args, callback) => {
	callback(null, (function() {
		return todoList
	}()))
}

const addTodo = (args, callback) => {
	callback(null, (function() {
		const newTodo = new Todo(args.todo)
		todoList.push(newTodo)
		return newTodo
	}()))
}

const deleteTodo = (args, callback) => {
	callback(null, (function() {
		const index = todoList.findIndex(todo => todo.id === args.id)
		todoList.splice(index, 1)
		return todoList
	}()))
}

const checkTodo = (args, callback) => {
	callback(null, (function() {
		const index = todoList.findIndex(todo => todo.id === args.id)
		todoList[index].checked = true
		return todoList[index]
	}()))
}

const uncheckTodo = (args, callback) => {
	callback(null, (function() {
		const index = todoList.findIndex(todo => todo.id === args.id)
		todoList[index].checked = false
		return todoList[index]
	}()))
}

const archiveTodo = (args, callback) => {
	callback(null, (function() {
		const index = todoList.findIndex(todo => todo.id === args.id)
		todoList[index].archived = true
		return todoList[index]
	}()))
}

const unarchiveTodo = (args, callback) => {
	callback(null, (function() {
		const index = todoList.findIndex(todo => todo.id === args.id)
		todoList[index].archived = false
		return todoList[index]
	}()))
}

const server = jayson.server({
	getTodoList,
	addTodo,
	deleteTodo,
	checkTodo,
	uncheckTodo,
	archiveTodo,
	unarchiveTodo
})

// app.use(cors({methods: ['POST']}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(server.middleware())

app.listen(3005, () => {
    console.log("App is listening on port 3005")
})
