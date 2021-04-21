const dotenv = require("dotenv/config");
const app = require("./app");

const port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
