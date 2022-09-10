const fs = require('fs');
module.exports = {
    path: `/search/:r`,
    method: "get",
    go: async (req, res) => {
        const r = req.params.r;
        fs.readdir(`db`, async (err, files) => {
            if (err) {
                console.log(err); return res.status(404).json({ error: { err: err.message } })
            } else {
                let rsl = "";
                files.forEach(async file => {
                    const data = fs.readFileSync(`db/${file}`, 'utf-8').replace(/\r/g, '').split('\n');
                    data.forEach(e => {
                        if (e.toLowerCase().includes(r.toLowerCase()) || e.toLowerCase() === r.toLowerCase()) {
                            rsl += `${e}\\n`;
                        };
                    });
                });
                if (rsl !== "") res.render("index.ejs", { c: rsl });
                else return res.sendFile("aucun.html", { root: "./views" });
            }
        })
    }
}