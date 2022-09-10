const PORT = process.env.PORT || 8080;
//process.on("unhandledRejection", (a) => {if (a.message) return undefined})

const express = require("express");
const app = express();
const cors = require('cors');
const { readdirSync } = require("fs");

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.static(__dirname + '/views'));

const loadApp = (dir = "./app/") => {
    const commands = readdirSync(`${dir}/`).filter(files => files.endsWith(".js"));
    for (const file of commands) {
        const getFile = require(`${dir}/${file}`);
        const method = getFile.method;
        const path = getFile.path;
        if (method === "get") app.get(path, async (req, res) => await getFile.go(req, res));
        if (method === "post") app.post(path, async (req, res) => await getFile.go(req, res));
        console.log(`=> [${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getUTCSeconds()}] - app charger {${path}} [${method}]`)
    };
};
loadApp();

app.listen(PORT, () => {
    console.log(`=> [${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getUTCSeconds()}] - API ON`);
})
