# Project #1: ToDo List

## Project Overview 

## _Interview Task: To-Do List with Basic Authentication_

**Objective**:<br/> Build a simple RESTful API for a to-do list application with user authentication.
**Requirements**:<br/>
1. User Management:
    <br/>a. Users can register with a username and password.
    <br/>b. Passwords should be securely stored using a hashing algorithm (e.g., bcrypt).
2. Authentication:
    <br/>a. Users can login with their username and password.
    <br/>b. Upon successful login, the backend should respond with a success message.
    <br/>c. Subsequent requests to access user-specific data (e.g., to-do list) must include the username in the request (e.g., header, query parameter).
3. To-Do List:
    <br/>a. Users can create, view, update, and delete their own to-do items.
    <br/>b. Each to-do item should have a title, image and an optional description.


**Steps:** <br/>
01. create a project directory (i.e: project-1-ToDo-List)
02. enter to the directory `cd project*`
03. create a `index.js` file
04. run `npm init`
05. type project name, project version, author name etc by pressing enter after each data.
06. this will create a `package.json` file in project
07. run `npm i express` (NodeJS framework)
08. run `npm i validator` (to use to validate user input)
09. run `npm i bcrypt` (to encrypt password)
10. run `npm i nodemon` (to run server automatically after each save)
11. add `"start": "nodemon index.js",` inside `scripts` block
12. run `npm i mongodb` (to install MongoDB database)
13. run `npm i mongoose` (to use MongoDB api)