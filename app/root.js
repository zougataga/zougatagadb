module.exports = {
    path: `/`,
    method: "get",
    go: async (req, res) => {
       return res.sendFile("index.html", { root: "./views" });
    }
}