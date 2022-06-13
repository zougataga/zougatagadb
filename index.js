// @{Author}: https://github.com/wass2345 

const PORT = process.env.PORT || 8080
//process.on("unhandledRejection", (a) => {if (a.message) return undefined})
const express = require("express")
const app = express()
const cors = require('cors')
require("colors")
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.static(__dirname + '/views'));
app.get("/",(req,res)=>require("./app/root.js")(req,res))
app.get("/create",(req,res)=>require("./app/create.js").u(req,res))
app.post("/create",(req,res)=>require("./app/create.js").d(req,res))
app.post("/login",(req,res)=>require("./app/login.js")(req,res))
app.all('*', (req, res) => require("./app/root.js")(req,res));
app.listen(PORT, () => { 
console.clear()
console.log(`=> [${new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getUTCSeconds()+":"}] - API ON`.rainbow);
})

