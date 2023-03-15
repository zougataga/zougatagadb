## ZougatagaDb

## Installation

```python
npm i zougatagadb
```

## Example

```js

const zougatagaDb = require("../");
const db = new zougatagaDb();
// if you want to specify a path you can do so like this
// const db = new zougatagaDb({ path: "source/to/path/test.zougatagadb" });

db.set("level", [{ level: 1 }]);
// -> [{ level: 1 }]

db.get("level");
// -> [{ level: 1 }]

db.pull("level", (e) => e.level === 1, "object");
// => {level: 1}

db.getAll()
// -> [ { id: 'level', data: [{ level: 1 }] } ]

db.delete("level");
// => undefined
```
