# Store Manager

### About

The project consolidates the use of Docker, MySQL, Node.js and Software Architecture tools following the MSC model for creating a RESTful API with complete CRUD. As a challenge, a CRUD API for an online store was built, in which it is possible to read, create, edit and delete products and sales from the database.

This project uses the MySQL relational database, and to manipulate it we made use of the mysql/promise library for Node.js, which provides an interface based on promises to execute queries and interact with a MySQL database.

The tests were developed using the Mocha, Chai and Sinon tools, with 100% coverage of the project.

### Developed Skills and Tools

- docker
- mysql
- Node.js
- Express
- Software Architecture following the MSC model
- Building a CRUD API
- Unit tests with: Mocha, Chai and Sinon

### How to Execute
⚠️ You must have Docker installed to run this project

-> Step by step

1) Clone the repository in a preferred folder
```js
git clone git@github.com:allysonbogo/project-store-manager.git
```
2) Enter the root folder of the project and install all dependencies
 ```js
npm install
```
3) To run the project it is necessary to execute the command below in the backend directory of the project. This will make the docker containers orchestrated and the application available.
```js
docker-compose up -d
```
4) The server will be started along with the docker orchestration. To view the API interface, Thunder Client, Postman, Insomnia or any other tool of your choice can be used
5) To test the project use the following scripts in the terminal where the container was orchestrated
```js
npm run test:mocha
```
```js
npm run test:coverage
```
