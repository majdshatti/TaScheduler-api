# TaScheduler-api

### Introduction

TaScheduler API is a backend project that provides clients with multiple endpoints for scheduling and managing a user's tasks.

### TaScheduler-api features

- Authenticated and Authorized.
- Reset password.
- Multiple projects with multiple tasks.
- Each task can have multiple todos.
- Node cron tasks for checking task status (overdue, completed and started).
- Supports real time notifications (under development).
- Multiple languages for server respones only.

### Installation Guide

- Get the bot [here](https://discord.com/api/oauth2/authorize?client_id=1014203508217626674&permissions=2147485696&scope=bot%20applications.commands).
- Run npm install to install all dependencies.
- Mongodb database is required.
- Create a config.env file in your project src folder and add your variables. See the environment.d typescript file for assistance.

### Usage

- Run npm run dev to start the server.
- Connect to the API using Postman on port 3001.

### API Endpoints

#### Un Authenticated User Endpoints

| HTTP Verbs | Endpoints                      | Action                                          |
| ---------- | ------------------------------ | ----------------------------------------------- |
| POST       | /api/auth/register             | Create a new user account                       |
| POST       | /api/auth/login                | Login an existing user account                  |
| POST       | /api/auth/forgotpassword       | Request a reset password to an existing account |
| POST       | /api/auth/resetpassword/:token | Set a new password                              |

#### Authenticated Endpoints

##### User Endpoints

| HTTP Verbs | Endpoints          | Action                                             |
| ---------- | ------------------ | -------------------------------------------------- |
| GET        | /api/user          | Retrieve all users                                 |
| GET        | /api/user?limit=10 | Retrieve all users with pagination of 10 documents |
| GET        | /api/user/profile  | Retrieve logged in user profile                    |
| GET        | /api/user/:slug    | Retrieve user informations by slugyifed username   |
| PUT        | /api/user          | Edit User profile                                  |
| DELETE     | /api/user          | Delete user account                                |

##### Project Endpoints

| HTTP Verbs | Endpoints             | Action                                                |
| ---------- | --------------------- | ----------------------------------------------------- |
| GET        | /api/project          | Retrieve all projects                                 |
| GET        | /api/project?limit=10 | Retrieve all projects with pagination of 10 documents |
| POST       | /api/project          | Create a project                                      |
| PUT        | /api/project          | Edit a project informations                           |
| DELETE     | /api/project          | Delete project account                                |

##### Task Endpoints

| HTTP Verbs | Endpoints                        | Action                                             |
| ---------- | -------------------------------- | -------------------------------------------------- |
| GET        | /api/task                        | Retrieve all tasks                                 |
| GET        | /api/task?limit=10               | Retrieve all tasks with pagination of 10 documents |
| POST       | /api/task                        | Create a task                                      |
| POST       | /api/task/:id/todo               | Add a todo to a task                               |
| PUT        | /api/task                        | Edit a task informations                           |
| PUT        | /api/task/:id/complete           | Mark task as completed                             |
| PUT        | /api/task/:id/todo/:todoId       | Edit a todo description                            |
| PUT        | /api/task/:id/todo/:todoId/check | Mark a todo as completed                           |
| DELETE     | /api/task                        | Delete task account                                |
| DELETE     | /api/task/:id/todo/:todoId       | Remove a todo from task                            |

### Technologies Used

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
- [Mongoose](https://mongoosejs.com/) Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
- [Socket.io](https://socket.io) Socket.IO is an event-driven library for real-time web applications.

### Authors

- [Majd Al-Shatti](https://github.com/majdshatti)
