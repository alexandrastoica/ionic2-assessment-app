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
var ionic_angular_1 = require('ionic-angular');
var core_1 = require('@angular/core');
var Test = (function () {
    function Test(section, question, score, question_id, test_id) {
        this.section = section;
        this.question = question;
        this.score = score;
        this.question_id = question_id;
        this.test_id = test_id;
    }
    return Test;
}());
exports.Test = Test;
var CreateTest = (function () {
    function CreateTest(id, name, date, percentage) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.percentage = percentage;
    }
    return CreateTest;
}());
exports.CreateTest = CreateTest;
var DementiaSqlightService = (function () {
    // Init an empty DB if it does not exist by now!
    function DementiaSqlightService() {
        this.storage = null;
        this.storage = new ionic_angular_1.Storage(ionic_angular_1.SqlStorage);
        this.storage.query('CREATE TABLE IF NOT EXISTS test_sections (id INTEGER PRIMARY KEY AUTOINCREMENT, section Text, question TEXT, score TEXT, question_id INTEGER, test_id INTEGER)');
        this.storage.query('CREATE TABLE IF NOT EXISTS tests (id INTEGER PRIMARY KEY AUTOINCREMENT, name Text, date TIMESTAMP)');
    }
    ////////////////////////// QUERIES FOR TESTS //////////////////////
    DementiaSqlightService.prototype.insertCreateTest = function (createTest) {
        var sql = 'INSERT INTO tests (name, date) VALUES (?, DATE())';
        return this.storage.query(sql, [createTest.name]);
    };
    DementiaSqlightService.prototype.getCreatedTests = function () {
        return this.storage.query('SELECT * FROM tests ORDER BY date ASC');
    };
    DementiaSqlightService.prototype.getAnsweredQuestions = function (test_id) {
        var sql = 'SELECT * FROM test_sections WHERE test_id = ?';
        return this.storage.query(sql, [test_id]);
    };
    ////////////////////////// QUERIES FOR TEST_SECTIONS //////////////////////
    // Get all notes of our DB
    // Possibly change to getSections
    DementiaSqlightService.prototype.get = function (id) {
        var sql = 'SELECT * FROM test_sections WHERE test_id = ? GROUP BY section ORDER BY section ASC';
        return this.storage.query(sql, [id]);
    };
    // Get tests by section and test id
    DementiaSqlightService.prototype.getBySection = function (section, id) {
        var sql = 'SELECT * FROM test_sections WHERE section = ? and test_id = ? ORDER BY section ASC';
        return this.storage.query(sql, [section, id]);
    };
    // Save a new note to the DB
    DementiaSqlightService.prototype.add = function (test) {
        // let sql = 'INSERT INTO test_sections (section, question, score, question_id) VALUES (?, ?, ?, ?)';
        // return this.storage.query(sql, [test.section, test.question, test.score, test.question_id]);
        var sql = 'INSERT INTO test_sections (section, question, question_id, score, test_id) VALUES (?, ?, ?, ?, ?)';
        return this.storage.query(sql, [test.section, test.question, test.score, test.question_id, test.test_id]);
    };
    // Update an existing note with a given ID
    DementiaSqlightService.prototype.update = function (score, section) {
        var sql = 'UPDATE test_sections SET score = ? WHERE section = ?';
        return this.storage.query(sql, [score, section]);
        //let sql = 'UPDATE test_sections SET score = \"' + test.score + '\"';
        // this.storage.query(sql);
    };
    DementiaSqlightService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DementiaSqlightService);
    return DementiaSqlightService;
}());
exports.DementiaSqlightService = DementiaSqlightService;
