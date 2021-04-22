const app = require("./app");
const dotenv = require("dotenv/config");

const port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
});
