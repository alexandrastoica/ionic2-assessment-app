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
var ionic_angular_1 = require('ionic-angular');
var dementiasqlight_service_1 = require('../../services/dementiasqlight.service');
var tests_1 = require('../tests/tests');
var sections_1 = require("../sections/sections");
var sections_questions_1 = require("../sections-questions/sections-questions");
var get_data_1 = require("../../providers/get-data/get-data");
/*
  Generated class for the DisplayCreatedTestsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DisplayCreatedTestsPage = (function () {
    function DisplayCreatedTestsPage(getdata, nav, dementiaSqlService) {
        var _this = this;
        this.getdata = getdata;
        this.nav = nav;
        this.dementiaSqlService = dementiaSqlService;
        this.questionCount = 0;
        this.getData = getdata;
        this.getData.load().then(function (data) {
            for (var i = 0; i < data; i++) {
                _this.questionCount += data[i].questions.length;
            }
        });
        console.log("question count: " + this.questionCount);
    }
    DisplayCreatedTestsPage.prototype.ionViewLoaded = function () {
        var _this = this;
        // this.platform.ready().then(() => {
        this.createdTests = [];
        this.dementiaSqlService.getCreatedTests()
            .then(function (data) {
            _this.createdTests = [];
            if (data.res.rows.length > 0) {
                var _loop_1 = function() {
                    var item = data.res.rows.item(i);
                    var answered = 0;
                    _this.dementiaSqlService.getAnsweredQuestions(item.id).then(function (data) {
                        if (item) {
                            answered = data.res.rows.length;
                        }
                    });
                    var percentage = ((answered / _this.questionCount) * 100);
                    console.log("pertange" + percentage);
                    console.log("answered" + answered);
                    console.log("qc" + _this.questionCount);
                    _this.createdTests.push(new dementiasqlight_service_1.CreateTest(item.id, item.name, item.date, percentage));
                };
                for (var i = 0; i < data.res.rows.length; i++) {
                    _loop_1();
                }
            }
        });
        //  });
    };
    DisplayCreatedTestsPage.prototype.showDetail = function (id) {
        var modal = ionic_angular_1.Modal.create(tests_1.Tests, {
            id: id
        });
        this.nav.present(modal);
        modal.onDismiss(function () {
        });
    };
    DisplayCreatedTestsPage.prototype.showDetailSection = function (createdtest) {
        var _this = this;
        var id = createdtest.id;
        this.dementiaSqlService.getAnsweredQuestions(id).then(function (data) {
            var item = data.res.rows[data.res.rows.length - 1];
            if (!item) {
                _this.nav.push(sections_1.Sections, {
                    testId: id
                });
            }
            else {
                _this.getData.getBySectionId(item.section)
                    .then(function (data) {
                    // console.log(data.questions);
                    if (data.questions.length >= (item.question_id + 1)) {
                        _this.nav.push(sections_questions_1.SectionsQuestionsPage, {
                            section: data,
                            questions: data.questions,
                            testId: item.test_id,
                            next_question: item.question_id
                        });
                    }
                    else {
                        _this.nav.push(sections_1.Sections, {
                            testId: item.test_id
                        });
                    }
                });
            }
        });
    };
    DisplayCreatedTestsPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/display-created-tests/display-created-tests.html',
            providers: [get_data_1.GetData]
        }), 
        __metadata('design:paramtypes', [get_data_1.GetData, ionic_angular_1.NavController, dementiasqlight_service_1.DementiaSqlightService])
    ], DisplayCreatedTestsPage);
    return DisplayCreatedTestsPage;
}());
exports.DisplayCreatedTestsPage = DisplayCreatedTestsPage;
