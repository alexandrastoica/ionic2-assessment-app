import {Injectable} from '@angular/core';

//window["PouchDB"] = PouchDB;
declare var require: any
let PouchDB = require('pouchdb');
window["PouchDB"] = PouchDB;

@Injectable()
export class DementiaService {
    private _db;
    private _data;

    initDB() {
        this._db = new PouchDB('dementia-db', { adapter: 'websql' });

       // console.log("db is " + this._db);
      //console.log("ADAPTER: " + this._db.adapter); //to check  which adapter is used by PouchDB
        //this._db.info().then(console.log.bind(console)); //n a mobile device the adapter will be displayed as websql even if it is using SQLite, so to confirm that it is actually using SQLite we have to do this
    }

    //responsible for inserting data:
    //object is simply serialized into JSON and stored in the database
    addData(insertData)
    {
        return this._db.post(insertData);
    }
    //inserts data and automatically generates a unique id
    updateData(updateData)
    {
        return this._db.put(updateData);
    }
    //doesn't generate a unique id, however will update data with matching id's
    removeData(removeData) {
        return this._db.remove(removeData);
    }

    getAllData()
    {
        if (!this._data) {
            return this._db.allDocs({ include_docs: true})
                .then(data => {

                    // Each row has a .doc object and we just want to send an
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.
                    this._data = data.rows.map(row => {
                        // Dates are not automatically converted from a string.
                 // row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true})
                        .on('change', this.onDatabaseChange);

                    return this._data;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._data);
        }
    }

    test()
    {
        console.log("fdifdofidofidofi");
    }

    private onDatabaseChange = (change) => {
        var index = this.findIndex(this._data, change.id);
        var data = this._data[index];

        if (change.deleted) {
            if (data) {
                this._data.splice(index, 1); // delete
            }
        } else {
            //change.doc.Date = new Date(change.doc.Date);
            if (data && data._id === change.id) {
                this._data[index] = change.doc; // update
            } else {
                this._data.splice(index, 0, change.doc) // insert
            }
        }
    }

    // Binary search, the array is by default sorted by _id.
    private findIndex(array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }

}
