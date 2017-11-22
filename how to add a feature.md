When adding a new feature:

1. Think about the URL
2. Add the URL as a Route in app.js, giving it a handler.
3. Make sure the handler is defined as a function in an object that is a controller.
4. Mount the controller in app.js
5. Define the controller action

How to Process a Form
1. Make sure the action and method of the form tag are sane.
2. Make sure you have a route and a contorller action to handle that submission
3. Get the data you need out of req.body, based on the name attributes of the input
4. instantiate the corresponding model or set the correct properties on an object
  5. based on the form data in req.body
6. Make sure you persist the data calling a save or update or insert
7. Send them somewhere else.
