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

###  Documentation (endpoints)

### :package: Products
<details>
  <summary> Routes </summary>
  <br>

| Method | Functionality | URL |
|---|---|---|
| `GET` | Returns a list of registered products | `http://localhost:3001/products`

<details>
  <summary> The request response is as follows with <code>status 200</code>: </summary>
  
```
[
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  ...
]
```
</details>
<br>

| Method | Functionality | URL |
|---|---|---|
| `GET` | Returns a product from id | `http://localhost:3001/products/:id`

<details>
  <summary> The request response is as follows with <code>status 200</code>: </summary>
  
```
{
  "id": 1,
  "name": "Martelo de Thor"
}
```
</details>

<details>
  <summary> The request will fail in the following cases: </summary>
  - The error <code>404</code> <code>{ message: "Product not found" }</code> is triggered if the product is not registered in the database; <br>
</details>
<br>

| Method | Functionality | URL |
|---|---|---|
| `POST` | Register a product | `http://localhost:3001/products`

<details>
  <summary> The body structure of the request must follow the pattern below: </summary>

```
{
  "name": "Elemento X"
}
```
</details>

<details>
  <summary> The request response is as follows with <code>status 201</code>: </summary>
  
```
{
  "id": 24,
  "name": "Elemento X"
}
```
</details>

<details>
  <summary> The request will fail in the following cases: </summary>
   - The route returns an error <code>400</code> <code>{ "message": "\"name\" is required" }</code> when trying to register a product without the name field; <br>
   - The route returns an error <code>422</code> <code>{ "message": "\"name\" length must be at least 5 characters long" }</code> when trying to register a product with the field name with less than 5 characters; <br>
   - The route returns an error <code>422</code> <code>{ "message": "\"name\" must be a string" }</code> when trying to register a product with the name field not being a string; <br>
</details>
<br>

| Method | Functionality | URL |
|---|---|---|
| `PUT` | Update a product from id | `http://localhost:3001/products/:id`

<details>
  <summary> The body structure of the request must follow the pattern below: </summary>

```
{
  "name": "Novo nome"
}
```
</details>

<details>
  <summary> The request response is as follows with <code>status 200</code>: </summary>
  
```
{
  "id": 1,
  "name": "Novo nome"
}
```
</details>

<details></code>
  <summary> The request will fail in the following cases: </summary>
   - The route returns an error <code>404</code> <code>{ "message": Product not found" }</code> when trying to update a product not registered in the database; <br>
   - The route returns an error <code>400</code> <code>{ "message": "\"name\" is required" }</code> when trying to update a product without the name field; <br>
   - The route returns an error <code>422</code> <code>{ "message": "\"name\" length must be at least 5 characters long" }</code> when trying to update a product with the field name with less than 5 characters; <br>
   - The route returns an error <code>422</code> <code>{ "message": "\"name\" must be a string" }</code> when trying to update a product with the name field not being a string; <br>
</details>
<br>

| Method | Functionality | URL |
|---|---|---|
| `DELETE` | Delete a product from the id | `http://localhost:3001/products/:id`

* Request response is <code>204</code> and no body on success

<details>
  <summary> The request will fail in the following cases: </summary>
  - The error <code>404</code> <code>{ "message": "Product not found" }</code> is triggered if the product is not registered in the database; <br>
</details>
</details>


### Sales

<details>
  <summary> Routes </summary>
  <br>

| Method | Functionality | URL |
|---|---|---|
| `GET` | Returns a list of registered sales | `http://localhost:3001/sales`

<details>
  <summary> The request response is as follows with <code>status 200</code>: </summary>
  
```
[
  {
    "saleId": 1,
    "date": "2023-05-30T21:21:46.000Z",
    "productId": 1,
    "quantity": 5
  },
  ...
]

```
</details>
<br>

| Method | Functionality | URL |
|---|---|---|
| `GET` | Returns a sale from the id | `http://localhost:3001/sales/:id`

<details>
  <summary> The request response is as follows with<code>status 200</code>: </summary>
  
```
[
  {
    "date": "2023-05-30T21:21:46.000Z",
    "productId": 1,
    "quantity": 5
  },
  ...
]
```
</details>

<details>
  <summary> The request will fail in the following cases: </summary>
  - The error <code>404</code> <code>{ "message": "Sale not found" }</code> is triggered if the sale is not registered in the database; <br>
</details>
<br>

| Method | Functionality | URL |
|---|---|---|
| `POST` | Register a sale | `http://localhost:3001/sales`

<details>
  <summary> The body structure of the request must follow the pattern below:  </summary>
  
```
[
  {
    "productId": 1,
    "quantity": 5
  },
  ...
]
```
</details>

<details>
  <summary> The request response is as follows with <code>status 201</code>: </summary>
  
```
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 5
    },
    ...
  ]
}
```
</details>

<details>
  <summary> The request will fail in the following cases: </summary>
   - The route returns an error <code>404</code> <code>{ "message": Product not found" }</code> when trying to register a sale with a product not registered in the database; <br>
   - The route returns an error <code>400</code> <code>{ "message": "\"productId\" is required" }</code> when trying to register a sale without the productId field; <br>
   - The route returns an error <code>422</code> <code>{ "message": "\"productId\" must be greater than or equal to 1" }</code> when trying to register a sale with the field productId less than 1; <br>
   - The route returns an error <code>400</code> <code>{ "message": "\"quantity\" is required" }</code> when trying to register a sale without the quantity field; <br>
   - The route returns an error <code>422</code> <code>{ "message": "\"quantity\" must be greater than or equal to 1" }</code> when trying to register a sale with the field quantity less than 1; <br>
</details>
<br>

| Method | Functionality | URL |
|---|---|---|
| `PUT` | Updates the quantity of a product of a sale | `http://localhost:3001/sales/:saleId/  products/:productId/quantity`

<details>
  <summary> The body structure of the request must follow the pattern below: </summary>
  
```
{
  "quantity": 5
}
```
</details>

<details>
  <summary> The request response is as follows with <code>status 200</code>: </summary>
  
```
{
  "date": "2023-05-31T00:21:46.000Z",
  "productId": 1,
  "quantity": 1,
  "saleId": 1
}
```
</details>

<details>
  <summary> The request will fail in the following cases:</summary>
   - The error <code>404</code> <code>{ "message": Sale not found" }</code> is triggered when trying to update a sale not registered in the database; <br>
   - The error <code>404</code> <code>{ "message": Product not found in sale" }</code> is triggered when trying to update a product not registered in the sale; <br>
   - The error <code>400</code> <code>{ "message": "\"quantity\" is required" }</code> is triggered when trying to update a sale without the quantity field; <br>
   - The error <code>422</code> <code>{ "message": "\"quantity\" must be greater than or equal to 1" }</code> is triggered when trying to update a sale with the quantity field less than 1; <br>
</details>
<br>

| Method | Functionality | URL |
|---|---|---|
| `DELETE` | Delete a sale from the id | `http://localhost:3001/sales/:id`

* Request response is <code>204</code> and no body on success

<details>
  <summary> The request will fail in the following cases:</summary>
  - The route returns a <code>404</code> <code>{ "message": "Sale not found" }</code> error, if the sale is not registered in the database; <br>
</details>
</details>
<br>
