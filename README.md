# marquee - a project made by 6 happy students

## Sequence Diagram: https://www.figma.com/board/m09ipWSAiB344xhBuNDznC/TE4%3A-Authentication-and-Access-Contrtol?node-id=0-1&p=f&t=Dq4ZyuCFLlLRc2IT-0

## How to Contribute

1. **Clone the Forked Repo**:

    ```sh
    git clone git@github.com:soramicha/307-team-project.git

    ```

2. **Setup**:

    ```sh
    npm install
    cd packages/frontend && npm install

    ```

3. **Create a New Branch**:

    ```sh
    git checkout -b feature-name

    ```

4. **Commit Your Changes**:

    ```sh
    git commit -m "feat: add new feature description"

    ```

5. **Push to Your Branch**:

    ```sh
    git push origin feature-name

    ```

6. **Create a Pull Request (PR)**:
    - Go to the repo on Github
    - Click "New Pull Request"
    - Select your branch and submit the PR.

## Code Guidelines

- Follow Prettier
- Ensure your code is well-documented.
- Write meaningful commit messages.

Notes:

To run the backend:

- npm run dev in the backend directory
- make sure you create a .env file for TOKEN_SECRET so you can run it properly (put some random thing for now: ex. TOKEN_SECRET=hi)
- make sure you install dotenv as well (documentation online)
- make sure you include MONGO_CONNECTION_STRING in your env file! You can get the password from one of us and the link of the connection string is found in our shared database in Mongodb itself! So just paste it in! We need this in order to be able to connect our database to the backend!

Using Postman: Postman is a convenient way to test our API's

- when you download Postman, make sure your backend (npm run dev) is running! it will not work if you don't run it first
- make sure that you use http://localhost:8000 instead of the frontend's http://localhost:5173/ when testing on Postman!
- copy paste the local host link into Postman, and make sure the type of HTTP request (GET, POST, PUT, etc) is correctly adjusted before hitting send
- console.log or inspect console on browser to check for error messages
- if your backend doesn't run and it talks about a cookie-parser, run: npm install cookie-parser

To run frontend:

- make sure you npm i axios so you can run it!
- npm start in the frontend directory
