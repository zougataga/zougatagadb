
const zougatagaDb = require("zougatagabb");
const db = new zougatagaDb();
// if you want to specify a path you can do so like this
// const db = new QuickDB({ path: "source/to/path/test.zougatagabb" });

// Setting an object in the database:
db.set("level", { level: 1 });
// -> { level: 1 }

// Getting an object from the database:
db.get("level");
// -> { level: 1 }
