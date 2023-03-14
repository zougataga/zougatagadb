## ZougatagaDb

## Installation

```python
npm i zougatagadb
```

## Example

```js

const zougatagaDb = require("zougatagadb");
const db = new zougatagaDb();
// if you want to specify a path you can do so like this
// const db = new zougatagaDb({ path: "source/to/path/test.zougatagadb" });

// Setting an object in the database:
db.set("level", { level: 1 });
// -> { level: 1 }

// Getting an object from the database:
db.get("level");
// -> { level: 1 }

db.getAll()
// -> [ { id: 'level', data: { level: 1 } } ]

```
