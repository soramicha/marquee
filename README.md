# marquee

## Sequence Diagram: https://www.figma.com/board/m09ipWSAiB344xhBuNDznC/TE4%3A-Authentication-and-Access-Contrtol?node-id=0-1&p=f&t=Dq4ZyuCFLlLRc2IT-0

## How to Contribute
1. **Clone the Forked Repo**:  
    ```sh
    git clone git@github.com:soramicha/307-team-project.git

2. **Setup**:
    ```sh
    npm install
    cd packages/frontend && npm install

3. **Create a New Branch**:
    ```sh
    git checkout -b feature-name

4. **Commit Your Changes**:
    ```sh
    git commit -m "feat: add new feature description"

5. **Push to Your Branch**:
    ```sh
    git push origin feature-name

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
- make sure you create a .env file for TOKEN_SECRET so you can run it properly
- make sure you install dotenv as well (documentation online)

Using Postman: Postman is a convenient way to test our API's
- when you download Postman, make sure your backend (npm run dev) is running! it will not work if you don't run it first
- copy paste the local host link into Postman, and make sure the type of HTTP request (GET, POST, PUT, etc) is correctly adjusted before hitting send
- console.log or inspect console on browser to check for error messages

To run frontend:
- npm start in the frontend directory