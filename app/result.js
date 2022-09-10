module.exports = {
    path: `/search`,
    method: "post",
    go: async (req, res) => {
        return res.render("loading.ejs", { h: `/search/${req.body.search}` })
    }
}