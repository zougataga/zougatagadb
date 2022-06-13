const u = (req, res) => {
    return res.sendfile("login.html",{root:"./views"});
}

module.exports = u
