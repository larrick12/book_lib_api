
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

Note: Before you can create new book, User must login to create book or comment on existing books.

1. To create new user.

    The `signup` word right after `mutation` is used to pass Query Variables in JSON format, which you will find right below graphql playground window. this store variables data that you don't want to hardcoded into your schema.
    ```sh
        mutation signup($firstname: String!, $lastname: String!, $email: String!, $username: String!, $password: String!) {
            signup(firstname: $firstname, lastname: $lastname, email: $email, username: $username, password: $password) {
                uid
                firstname
                lastname
                username
                email
                last_login
                token
                message
                status
            }
        }
    ```

2. To signin
    make sure to save generated token in the header in this format : `{"Authorization: "Bearer your-token" }`, get the header and add the token if you're using `Postman`.
    ```sh
    mutation{
        signin(email:"lauytuiytkyl@gmail.com", password: "mypassword"){
            username
            uid
            lastname
            last_login
            token
        }
    }
    ```

2. To create Book, copy below book schema to create new book.
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

3. To comment on a book created by you or other users.
    ```sh
        mutation {
            addcomment(bid: 19, content: "this is another one nice!")
            {   
                cid
                commenter
                status
                message
                content
                <!-- below is the book you comment on. -->
                books{
                    bid
                    title
                    content
                }
            }
        }
    ```

5. To update book details
    ```sh
        mutation{
            updatebook(bid:18, title: "updated title", content: "this is book updated contet..."){
                title
                bid
                content
                created_on
                updated_on
                author
                status
                message
            }
        }
    ```

6. To update comment on a specific book.
    ```sh
    mutation{
        updatecomment(cid:13, book_id: 19, content: "this is an updated comment"){
            cid
            content
            created_at
            commenter
            status
            message
            books{
                bid
                title
                content
            }
        }
    }
    ```

7. To delete comment 
    ```sh
    mutation{
        dropcomment(cid: 13, bid: 19){
            cid
            book_id
            user_id
            message
            status
        }
    }
    ```
