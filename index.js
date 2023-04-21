const
    cipherData = require("cipherdata"),
    cipher = new cipherData(),
    fs = require("fs");
class zougatagaDb {
    constructor({ path = "./zougataga.db", cryptData = true } = {}) {
        this.path = path;
        this.cryptData = cryptData;
        if (!fs.existsSync(this.path)) this.#setAllData({});
    }

    getAll() {
        const
            data = this.#getAllData(),
            all = [];
        for (let [key, value] of Object.entries(data)) all.push({ id: key, data: value });
        return all
    }

    deleteAll() {
        this.#setAllData({});
        return {}
    }

    set(id, dataToSet) {
        if (!id) throw new TypeError("No id specified");
        if (typeof id != "string") throw new TypeError(`ID: "${id}" IS NOT a string`);
        if (dataToSet === undefined) throw new TypeError(`Data @ ID: "${id}" IS NOT specified`);
        return this.#setData(id, dataToSet)
    }

    get(id) {
        if (!id) throw new TypeError("No id specified");
        if (typeof id != "string") throw new TypeError(`ID: "${id}" IS NOT a string`);
        return this.#getData(id);
    }

    delete(id) {
        if (!id) throw new TypeError("No id specified");
        if (typeof id != "string") throw new TypeError(`ID: "${id}" IS NOT a string`);
        return this.#deleteData(id);
    }

    push(id, dataToPush) {
        if (!id) throw new TypeError("No id specified");
        if (typeof id != "string") throw new TypeError(`ID: "${id}" IS NOT a string`);
        if (dataToPush === undefined) throw new TypeError(`Data @ ID: "${id}" IS NOT specified`);
        let data = this.#getData(id);
        if (!Array.isArray(data)) data = [];
        data.push(dataToPush);
        this.#setData(id, data);
        return this.#getData(id);
    }

    pull(id, dataToFind) {
        if (!id) throw new TypeError("No id specified");
        if (typeof id != "string") throw new TypeError(`ID: "${id}" IS NOT a string`);
        if (dataToFind === undefined) throw new TypeError(`Data @ ID: "${id}" IS NOT specified`);
        const data = this.#getData(id) || [];
        if (!Array.isArray(data)) throw new TypeError(`ID: "${id}" IS NOT a array`);
        return data.filter(dataToFind);
    }

    pullDelete(id, condition) {
        if (!id) throw new TypeError("No id specified");
        if (typeof id != "string") throw new TypeError(`ID: "${id}" IS NOT a string`);
        if (condition === undefined) throw new TypeError(`Condition @ ID: "${id}" IS NOT specified`);
        const
            newd = [],
            data = this.#getData(id) || [];
        if (!Array.isArray(data)) throw new TypeError(`ID: "${id}" IS NOT a array`);
        for (const d of data) { if (!condition(d)) newd.push(d) };
        this.#setData(id, newd);
        return this.#getData(id);
    }

    add(id, number) {
        if (!id) throw new TypeError("No id specified");
        if (typeof id != "string") throw new TypeError(`ID: "${id}" IS NOT a string`);
        if (!number) throw new TypeError(`Data @ ID: "${id}" IS NOT specified`);
        const
            data = Number(this.#getData(id)) || 0,
            rnumber = Number(number);
        if (!rnumber || isNaN(rnumber)) throw new Error(`[zougatagaDb] Data @ ID: "${id}" IS NOT A number.\nFOUND: ${number}\nEXPECTED: number`);
        return this.#setData(id, Number(data + rnumber));
    }

    subtract(id, number) {
        if (!id) throw new TypeError("No id specified");
        if (typeof id != "string") throw new TypeError(`ID: "${id}" IS NOT a string`);
        if (!number) throw new TypeError(`Data @ ID: "${id}" IS NOT specified`);
        const
            data = Number(this.#getData(id)) || 0,
            rnumber = Number(number);
        if (!rnumber || isNaN(rnumber)) throw new Error(`[zougatagaDb] Data @ ID: "${id}" IS NOT A number.\nFOUND: ${number}\nEXPECTED: number`);
        return this.#setData(id, Number(data - rnumber));
    }

    #setData(id, dataToSet) {
        try {
            const data = (this.#getAllData());
            data[id] = dataToSet;
            this.#setAllData(data);
            return this.#getData(id);
        } catch (error) {
            return;
        }
    }

    #deleteData(id) {
        try {
            const data = (this.#getAllData());
            delete data[id];
            this.#setAllData(data);
            return this.#getData(id);
        } catch (error) {
            return;
        }
    }

    #getData(id, defaultData) {
        try {
            const fetched = (this.#getAllData())[id];
            if (!fetched && defaultData) this.#setData(id, defaultData);
            return fetched;
        } catch (error) {
            return
        }
    }

    #setAllData(obj) {
        try {
            let d = JSON.stringify(obj);
            if (this.cryptData) d = cipher.encryptData(d);
            fs.writeFileSync(this.path, d, (this.cryptData ? "hex" : "utf-8"));
        } catch (error) {
            throw error;
        }
    }

    #getAllData() {
        try {
            if (!fs.existsSync(this.path)) this.#setAllData({});
            let d = fs.readFileSync(this.path, (this.cryptData ? "hex" : "utf-8"));
            if (this.cryptData) d = cipher.decryptData(d);
            if (d) d = JSON.parse(d);
            return d;
        } catch (error) {
            this.#setAllData({});
            return {}
        }
    }

};
module.exports = zougatagaDb
