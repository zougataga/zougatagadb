const
    crypto = require('crypto'),
    fs = require("fs");
class zougatagaDb {
    constructor(obj) {
        this.path = obj?.path ?? "./db.zougatagadb";
        this.key = obj?.options?.key ?? this.stringToBite("zougatagaongit", 32);
        this.iv = obj?.options?.iv ?? this.stringToBite("zougatagaongit", 16);
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

    pull(id, dataToFind, type) {
        if (!id) throw new TypeError("No id specified");
        if (typeof id != "string") throw new TypeError(`ID: "${id}" IS NOT a string`);
        if (dataToFind === undefined) throw new TypeError(`Data @ ID: "${id}" IS NOT specified`);
        if (type != "array" && type != "object") type == "array";
        const data = this.#getData(id);
        if (!Array.isArray(data)) throw new TypeError(`ID: "${id}" IS NOT a array`);
        if (type === "object") return data.find(dataToFind);
        else if (type === "array") return data.filter(dataToFind);
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

    stringToBite(str, size = 32) {
        return (crypto.createHash('sha256').update(str).digest()).slice(0, size);
    }

    #setAllData(obj) {
        try {
            fs.writeFileSync(this.path, this.#encryptData(JSON.stringify(obj)));
        } catch (error) {
            throw error;
        }
    }

    #setData(id, dataToSet) {
        const data = (this.#getAllData());
        data[id] = dataToSet;
        this.#setAllData(data);
        return this.#getData(id);
    }

    #deleteData(id) {
        const data = (this.#getAllData());
        delete data[id];
        this.#setAllData(data);
        return this.#getData(id);
    }

    #getData(id, defaultData) {
        const fetched = (this.#getAllData())[id];
        if (!fetched && defaultData) this.#setData(id, defaultData);
        return fetched;
    }

    #getAllData() {
        try {
            return JSON.parse(this.#decryptData(fs.readFileSync(this.path)));
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    #encryptData(data) {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
        let encrypted = cipher.update(data, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return Buffer.from(encrypted, 'hex');
    }

    #decryptData(data) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
        let decrypted = decipher.update(data, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
};
module.exports = zougatagaDb
