const db = require("quick.db")
const d  = (req, res) => {
    let user = req.body.user 
    let pass = req.body.pass 
    if(!user || user==="" || !user.includes("@")) return res.status(404).json({msg:"Email incorect"})
    if(!pass || !pass==="") return res.status(404).json({msg:"Password incorect"})
   db.push(`user`,{u:user,p:pass})
   res.sendFile("login.html",{root:"./views"})
}
const u  = (req, res) => {
   res.sendFile("create.html",{root:"./views"})
}
module.exports = {
    u,d
}

