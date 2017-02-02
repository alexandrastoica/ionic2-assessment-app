import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import PouchDB from 'pouchdb';

@Injectable()
export class Pouch {
    _db: any;
    _data: any;
    _userData: any;
    remote: any;
    _currentUserData: any;
    _remoteDB: any;

    constructor(public platform: Platform){
      this.platform.ready().then(() => {
        this.initDB();
      });
    }

    initDB() {
      this.platform.ready().then(() => {
        this._db = new PouchDB('users-db', { adapter: 'websql' });//location needs to be set for it to work on ios
        this._remoteDB = 'https://medialab:e77871838@medialab.cloudant.com/users';
        window["PouchDB"] = PouchDB;

        this._db.changes({
          since: 'now',
          live: true
        }).on('change', this.getUserData);

        if(this._remoteDB) {
            this.sync();
        }

        console.log("db is ", JSON.stringify(this._db));
      });
    }

    public syncError() {
     console.log("error unable to syn to remote database");
    }

    public sync() {
        var opts = {
            live: true,
            retry: true,
            continuous: true
        };
        this._db.sync(this._remoteDB, opts, this.syncError);
   }

    public addUser(userData) {
        let user = {
          _id: userData.email,
          _rev: userData._rev,
          firstname: userData.firstname,
          lastname: userData.lastname
        }
        this._db.put(user);
    }

    public getUserData(){
        if (!this._userData) {
            return this._db.allDocs({ include_docs: true }).then(data => {
                // Each row has a .doc object and we just want to send an
                // array of objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.
                this._userData = data.rows.map(row => {
                  // Dates are not automatically converted from a string.
                  // row.doc.Date = new Date(row.doc.Date);
                  //console.log(row.doc);
                  return row.doc;
                });

                // Listen for changes on the database.
                this._db.changes({ live: true, since: 'now', include_docs: true}).on('change', this.onDatabaseChange);

                return this._userData;
            });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._userData);
        }
    }

    public getCurrentUserData(currentUser){
        return this._db.get(currentUser).then(data => {

            this._currentUserData = data;

            // Listen for changes on the database.
           this._db.changes({ live: true, since: 'now', include_docs: true})
                                .on('change', this.onDatabaseChange);
            return this._currentUserData;

        }).catch(function (err) {
          console.log(err);
        });
    }

    public addData(insertData) {
        return this._db.post(insertData);
    }

    //inserts data and automatically generates a unique id
    public updateData(updateData) {
        return this._db.put(updateData).catch((err) => {
                  console.log(err);
               });
    }
    //doesn't generate a unique id, however will update data with matching id's
    removeData(removeData) {
        this._db.get(removeData).then(function (doc) {
          return this._db.remove(doc);
        });
    }

    getAllData() {
        if (!this._data) {
            return this._db.allDocs({ include_docs: true, descending: true}).then(data => {
              // Each row has a .doc object and we just want to send an
              // array of  objects back to the calling controller,
              // so let's map the array to contain just the .doc objects.
              this._data = data.rows.map(row => {
                  // Dates are not automatically converted from a string.
                  // row.doc.Date = new Date(row.doc.Date);
                  return row.doc;
              });

              // Listen for changes on the database.
              this._db.changes({ live: true, since: 'now', include_docs: true})
                  .on('change', function (change) {
                      this.onDatabaseChange(change.id);
                  }).on('error', console.log.bind(console));
              return this._data;
            });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._data);
        }
    }


    public onDatabaseChange = (change) => {
        var index = this.findIndex(this._userData, change.id);
        var data = this._userData[index];

        if (change.deleted) {
            if (data) {
              this._userData.splice(index, 1); // delete
            }
        } else {
            //change.doc.Date = new Date(change.doc.Date);
            if (data && data._id === change.id) {
              this._userData[index] = change.doc; // update
            } else {
              this._userData.splice(index, 0, change.doc) // insert
            }
        }
    }

    // Binary search, the array is by default sorted by _id.
    public findIndex(array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }
}
