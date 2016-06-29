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
var dementia_service_1 = require('../../services/dementia.service');
var SectionsQuestionsPage = (function () {
    function SectionsQuestionsPage(fb, params, nav, dementiaService) {
        this.fb = fb;
        this.nav = nav;
        this.dementiaService = dementiaService;
        this.total = {};
        this.n = 0;
        this.nav = nav;
        this.section = params.data.section;
        this.questions = params.data.questions;
        this.maxN = this.questions.length;
        //console.log(this.maxN);
        this.currentQuestion = this.questions[this.n];
        //this.platform = platform;
        this.questionForm = fb.group({
            'Validate': ['', common_1.Validators.compose([common_1.Validators.required])],
        });
        this.Validate = this.questionForm.controls['Validate'];
    }
    SectionsQuestionsPage.prototype.onSubmit = function (value) {
        if (this.questionForm.valid) {
            this.next();
            console.log(this.questionForm.value);
        }
    };
    SectionsQuestionsPage.prototype.next = function () {
        this.total = {
            "section_id": this.section.id,
            "questions": this.currentQuestion,
            "question_id": this.n,
            "answer_value": this.answer,
        };
        if (this.n < this.maxN - 1) {
            this.n += 1;
            this.currentQuestion = this.questions[this.n];
            //console.log("section id " + this.section.id + " question " + this.currentQuestion + " id " + this.n + " value " + this.answer);
            //console.log("questions " + this.questions);
            //console.log("total " + JSON.stringify(this.total));
            this.dementiaService.addData(this.total);
        }
        else {
            this.nav.push(sections_1.Sections);
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
        __metadata('design:paramtypes', [common_1.FormBuilder, ionic_angular_1.NavParams, ionic_angular_1.NavController, dementia_service_1.DementiaService])
    ], SectionsQuestionsPage);
    return SectionsQuestionsPage;
}());
exports.SectionsQuestionsPage = SectionsQuestionsPage;
