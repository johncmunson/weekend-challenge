### Weekend Challenge

##### Description:
Build a simple todo application that interacts with the provided NodeJS API. The application can be as simple or feature rich as you want.

##### Requirements:
- Must use a modern frontend framework or language
  - *[React](https://reactjs.org/), [Vue](https://vuejs.org/), [Angular2+](https://angular.io/), or [Elm](http://elm-lang.org/) are all valid options*
  - *Jquery and AngularJS are not allowed*
- CSS frameworks like [Bootstrap](https://getbootstrap.com/) or [Material Design](https://material.angular.io/) are optional
- Maximum of three dependencies
  - *Not counting frameworks, dev dependencies, or any build tools such as [Gulp](https://gulpjs.com/) or [Webpack](https://webpack.js.org/)*
- Must not copy any code, markup, or styling from readily available online examples of todo applications
- Must keep the state of the todo list in sync with the API at all times (not counting UI state like "hide archived todos"). For example, a task that is "checked" on the frontend should have this property set to true on the backend
- Must provide a README that explains how to run your app, as well as an explanation of the application architecture and why you made certain decisions or chose certain tools

##### Bonus:
*Note: Any dependencies added in support of a bonus feature will not count towards the dependency limit*
- Extend the API to support things like... reminders, due dates, recurring todos, tags, separate lists, etc.
- Implement a frontend state container such as Redux or MobX
- Create separate RESTful endpoints that replicate the functionality of the RPC endpoints
- Persist your todo list to a real database, rather than an in-memory array
- Add better error handling to the API
- Reorder todo items, possibly using drag'n'drop
- Etc. etc.

##### API Documentation:

The API is setup to run on port 3005 and follows the [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification). Start the server by cloning the repo, installing dependencies with `npm install`, and running `node index.js`. Below is an example of how you might interact with one of the endpoints using curl:
```
$ HDR='Content-type: application/json'
$ MSG='{"jsonrpc": "2.0", "method": "addTodo", "id": 1, "params": {"description": "Pickup the dry cleaning"}}'
$ curl -H $HDR -d $MSG http://localhost:3005
==> {"jsonrpc":"2.0","id":1,"result":{"description":"Pickup the dry cleaning","id":"H1KN6IWGX","checked":false,"archived":false}}
```

Out of the box, a standard Todo object is comprised of four properties. This structure can be extended or modified however you wish.
- description (string)
- id (string, auto-generated by the API)
- checked (boolean, API will default to false if not provided)
- archived (boolean, API will default to false if not provided)

Methods:
```
getTodoList()      -->  [Todo, Todo, ...]
getTodo(id)        -->  Todo
addTodo(Todo)      -->  Todo
deleteTodo(id)     -->  [Todo, Todo, ...]
checkTodo(id)      -->  Todo
uncheckTodo(id)    -->  Todo
archiveTodo(id)    -->  Todo
unarchiveTodo(id)  -->  Todo
```
To interact with the API, you may use [jayson](https://github.com/tedeh/jayson), a JSON-RPC compliant AJAX library. Alternatively, you could use a more generic AJAX library such as [axios](https://github.com/axios/axios) or [request](https://github.com/request/request), and if you're struggling to stay under the dependency limit, the built-in browser [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is always an option.
