import {Injectable} from '@angular/core';

let PouchDB = require('pouchdb');

@Injectable()
export class BirthdayService {
    private _db;
    private _data;

    initDB() {
        this._db = new PouchDB('dementia-db', { adapter: 'websql' });
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

    getAllUsers()
    {
        if (!this._data) {
            return this._db.allDocs({ include_docs: true})
                .then(data => {

                    // Each row has a .doc object and we just want to send an
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this._data = data.rows.map(row => {
                        // Dates are not automatically converted from a string.
                        row.doc.Date = new Date(row.doc.Date);
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

}
