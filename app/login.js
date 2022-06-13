const db = require("quick.db")
const f = (req, res) => {
    let user = req.body.user
    let pass = req.body.pass
    if (!user || user === "" || !user.includes("@")) return res.status(404).json({ msg: "Email incorect" })
    if (!pass || !pass === "") return res.status(404).json({ msg: "Password incorect" })
    let d = db.get("user")
    let a = false
    d.forEach(e => {
        if (e.u === user && e.p === pass) {
            a = true
        }
    })
    if (!a) return res.status(404).json({ msg: "Email ou Password incorect" })
    res.sendFile("yes.html",{root:"./views"})
}
module.exports = f

