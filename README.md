## ZougatagaDb

[![zougatagadb on npm](https://img.shields.io/npm/v/zougatagadb.svg)](https://www.npmjs.com/package/zougatagadb)

## Installation

```python
npm i zougatagadb
```

## Example

```js
const zougatagaDb = require("zougatagadb");
const db = new zougatagaDb();
// if you want to specify a path you can do so like this
// const db = new zougatagaDb({ path: "source/to/path/test.db" });
// To encrypt yes the data
// const db = new zougatagaDb({ cryptData: false });

db.set("alllevel", [{ level: 1 }, { level: 2 }]);
// -> [{ level: 1 }, { level: 2 }]

db.get("alllevel");
// -> [{ level: 1 }, { level: 2 }]

db.push("alllevel", { level: 1 });
// -> [{ level: 1 }, { level: 2 }, { level: 1 }]

db.pull("alllevel", (e) => e.level === 1);
// -> [{level: 1}, {level: 1}]

db.getAll()
// -> [ { id: 'alllevel', data: [{ level: 1 }, { level: 2 }, {level: 1}] } ]

db.pullDelete("alllevel", (e) => e.level === 1)
// -> [{level: 2}]

db.delete("alllevel");
// -> undefined

db.set("level_<userId>", 4);
// -> 4

db.add("level_<userId>", 1);
// -> 5

db.subtract("level_<userId>", 7);
// -> -2

db.deleteAll();
// -> undefined
```
