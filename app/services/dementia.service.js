"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var PouchDB = require('pouchdb');
window["PouchDB"] = PouchDB;
var DementiaService = (function () {
    function DementiaService() {
        var _this = this;
        this.onDatabaseChange = function (change) {
            var index = _this.findIndex(_this._data, change.id);
            var data = _this._data[index];
            if (change.deleted) {
                if (data) {
                    _this._data.splice(index, 1); // delete
                }
            }
            else {
                //change.doc.Date = new Date(change.doc.Date);
                if (data && data._id === change.id) {
                    _this._data[index] = change.doc; // update
                }
                else {
                    _this._data.splice(index, 0, change.doc); // insert
                }
            }
        };
    }
    DementiaService.prototype.initDB = function () {
        this._db = new PouchDB('dementia-db', { adapter: 'websql' });
        // console.log("db is " + this._db);
        //console.log("ADAPTER: " + this._db.adapter); //to check  which adapter is used by PouchDB
        //this._db.info().then(console.log.bind(console)); //n a mobile device the adapter will be displayed as websql even if it is using SQLite, so to confirm that it is actually using SQLite we have to do this
    };
    //responsible for inserting data:
    //object is simply serialized into JSON and stored in the database
    DementiaService.prototype.addData = function (insertData) {
        return this._db.post(insertData);
    };
    //inserts data and automatically generates a unique id
    DementiaService.prototype.updateData = function (updateData) {
        return this._db.put(updateData);
    };
    //doesn't generate a unique id, however will update data with matching id's
    DementiaService.prototype.removeData = function (removeData) {
        return this._db.remove(removeData);
    };
    DementiaService.prototype.getAllData = function () {
        var _this = this;
        if (!this._data) {
            return this._db.allDocs({ include_docs: true })
                .then(function (data) {
                // Each row has a .doc object and we just want to send an
                // array of  objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.
                _this._data = data.rows.map(function (row) {
                    // Dates are not automatically converted from a string.
                    // row.doc.Date = new Date(row.doc.Date);
                    return row.doc;
                });
                // Listen for changes on the database.
                _this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', _this.onDatabaseChange);
                return _this._data;
            });
        }
        else {
            // Return cached data as a promise
            return Promise.resolve(this._data);
        }
    };
    DementiaService.prototype.test = function () {
        console.log("fdifdofidofidofi");
    };
    // Binary search, the array is by default sorted by _id.
    DementiaService.prototype.findIndex = function (array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid;
        }
        return low;
    };
    DementiaService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DementiaService);
    return DementiaService;
}());
exports.DementiaService = DementiaService;
