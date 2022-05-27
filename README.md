
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/larrick12/book_lib_api">
  </a>
  <h3 align="center">TEMPLATE BOOK LIB API</h3>
  <p align="center">
    <a href="https://github.com/larrick12/book_lib_api/issues">Report Bug</a> . 
    <a href="https://booktemplib.herokuapp.com/graphql">Book Api - Heroku</a>
  </p>
</div>


## To run this book ap, consider below setup

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Below is an example of how you can instruct your audience on installing and setting up your app.

1. Clone the repo
   ```sh
   git clone https://github.com/larrick12/book_lib_api.git
   ```
2. Install NPM packages
   ```sh
   npm install or npm i
   ```
4. Install YARN packages
   ```sh
   yarn install
   ```
5. Enter your API in `build/config/env.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
6. Install YARN or NPM Typescript packages 
   ```sh
   npm i typescript or yarn install typescript
   ```
7. Install YARN or NPM other packages 
   ```sh
   npm i express ts-node graphql express-graphql bcryptjs ...
   ```
8. Install YARN or NPM packages as devdependencies
   ```sh
   npm i --save-dev @types/express @types/ts-node @types/graphql @types/express-graphql bcryptjs ...
   ```
9. configure Typescript config file, this will create a tsconfig.json file
   ```sh
   tsc --init
   ```


<!-- USAGE EXAMPLES -->
## Usage

### GraphQL Query and Mutation usage to create, update and delete book.

* Examples
[x] To create Book
    ```sh
    mutation{
        addbooks(title: "new book", content: "this is book content."){
            title
            bid
            author
            content
            created_on
            user_id
            message
            status
        }
    }
    ```




