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
var common_1 = require('@angular/common');
var sections_1 = require("../sections/sections");
var dementiasqlight_service_1 = require('../../services/dementiasqlight.service');
var SectionsQuestionsPage = (function () {
    function SectionsQuestionsPage(fb, params, nav, dementiaSqlService) {
        this.fb = fb;
        this.nav = nav;
        this.dementiaSqlService = dementiaSqlService;
        this.question = null;
        this.n = 0;
        this.nav = nav;
        this.section = params.data.section;
        this.questions = params.data.questions;
        this.testId = params.data.testId;
        console.log("quess" + this.questions);
        this.maxN = this.questions.length;
        this.n = params.data.next_question ? params.data.next_question : 0;
        this.currentQuestion = this.questions[this.n];
        //this.question = {};
        //this.platform = platform;
        this.questionForm = fb.group({
            'Validate': ['', common_1.Validators.compose([common_1.Validators.required])],
        });
        this.Validate = this.questionForm.controls['Validate'];
    }
    SectionsQuestionsPage.prototype.onSubmit = function (value) {
        if (this.questionForm.valid) {
            this.next();
        }
    };
    SectionsQuestionsPage.prototype.saveTest = function (showBadge) {
        var _this = this;
        if (showBadge === void 0) { showBadge = false; }
        this.question = new dementiasqlight_service_1.Test(this.section.id, this.currentQuestion, this.n + 1, this.answer, this.testId);
        console.log(JSON.stringify(this.question));
        console.log(this.testId);
        if (this.question) {
            this.dementiaSqlService.add(this.question).then(function (data) {
                //this.question.id = data.res["insertId"];
                var toast = ionic_angular_1.Toast.create({
                    message: 'Answer score was saved',
                    duration: 300
                });
                _this.nav.present(toast);
            });
        }
        else {
            this.dementiaSqlService.update(this.n, this.section.id);
            var toast = ionic_angular_1.Toast.create({
                message: 'Answer score was updated',
                duration: 300
            });
            this.nav.present(toast);
        }
    };
    SectionsQuestionsPage.prototype.next = function () {
        if (this.n < this.maxN - 1) {
            this.saveTest(true);
            this.n += 1;
            this.currentQuestion = this.questions[this.n];
            this.answer = null;
        }
        else {
            this.saveTest(true);
            this.n = 0;
            this.currentQuestion = null;
            this.answer = null;
            this.nav.push(sections_1.Sections, { testId: this.testId });
        }
    };
    //moves to previous section-question
    SectionsQuestionsPage.prototype.previous = function () {
        //this the n (start count) is less than the question length
        if (this.n < this.maxN - 1) {
            this.n -= 1; //then decrement the value (moves to previous question)
            //current question is then equal to the equal question count
            this.currentQuestion = this.questions[this.n];
            //if the start count is less than 1 -1 (i.e start question) take user back
            //to the sections (stops the count going to -1, -2 etc)
            if (this.n < 1 - 1) {
                this.nav.push(sections_1.Sections);
            }
        }
        else {
            this.nav.push(sections_1.Sections);
        } //END OF PREVIOUS FUNCTION
    };
    SectionsQuestionsPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/sections-questions/sections-questions.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, ionic_angular_1.NavParams, ionic_angular_1.NavController, dementiasqlight_service_1.DementiaSqlightService])
    ], SectionsQuestionsPage);
    return SectionsQuestionsPage;
}());
exports.SectionsQuestionsPage = SectionsQuestionsPage;
