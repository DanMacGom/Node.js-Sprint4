# Usage in Linux.
Open a terminal and navigate to the project folder.<br>
- `mongod` (start mongodb daemon, mongodb starts listening)<br>

Leave the previous terminal running and open a new one.
- `npm install` (install all node dependencies) <br>
- `npm start` (starts the app) <br>

Open Postman and go to headers and add key Content-Type and value application/json. <br>
![Headers](https://github.com/DanMacGom/Node.js-Sprint4/blob/main/Nivell-1/Exercici-1/photos/headers.png)<br>
Post a user to `localhost:3000/users` by sending an object with a name and an age inside the Body and selecting raw (default port is 3000, you can change the port by adding a .env file in the root folder and adding PORT=xxxx).<br>
![Post User](https://github.com/DanMacGom/Node.js-Sprint4/blob/main/Nivell-1/Exercici-1/photos/post-user.png)<br>
Copy the user id from the response.
![Response id](https://github.com/DanMacGom/Node.js-Sprint4/blob/main/Nivell-1/Exercici-1/photos/response-id.png)<br>
Make a get by using the id in the url.<br>
![Get user by id](https://github.com/DanMacGom/Node.js-Sprint4/blob/main/Nivell-1/Exercici-1/photos/get-user-by-id.png)
