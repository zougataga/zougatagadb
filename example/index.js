
const zougatagaDb = require("../");
const db = new zougatagaDb();
// if you want to specify a path you can do so like this
// const db = new zougatagaDb({ path: "source/to/path/test.zougatagadb" });

db.set("alllevel", [{ level: 1 }, { level: 2 }]);
// -> [{ level: 1 }]

db.get("alllevel");
// -> [{ level: 1 }]

db.push("alllevel", { level: 1 });

db.pull("alllevel", (e) => e.level === 1);
// => [{level: 1}, {level: 1}]

db.getAll()
// -> [ { id: 'level', data: [{ level: 1 }, { level: 2 }, {level: 1}] } ]

db.pullDelete("alllevel", (e) => e.level === 1)
// => [{level: 2}]

db.delete("alllevel");
// => undefined

db.set("level_<userId>", 4);
// -> 4

db.add("level_<userId>", 1);
// -> 5

db.subtract("level_<userId>", 7);
// -> -2