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
var truncate_1 = require('../../pipes/truncate');
/*
  Generated class for the TestquestionsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TestquestionsPage = (function () {
    function TestquestionsPage(nav, navParams, viewCtrl, dementiaSqlService) {
        this.nav = nav;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.dementiaSqlService = dementiaSqlService;
        this.section = this.navParams.get('section');
        this.id = this.navParams.get('id');
        //this.id = 1;
    }
    TestquestionsPage.prototype.ionViewLoaded = function () {
        var _this = this;
        //this.sections = [];
        this.dementiaSqlService.getBySection(this.section.section, this.id.id)
            .then(function (data) {
            _this.sections = [];
            if (data.res.rows.length > 0) {
                for (var i = 0; i < data.res.rows.length; i++) {
                    var item = data.res.rows.item(i);
                    _this.sections.push(new dementiasqlight_service_1.Test(item.section, item.question, item.score, item.question_id, item.id));
                }
            }
        });
        //console.log("id for test  is " + JSON.stringify(this.id.id));
    };
    TestquestionsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss(this.sections);
    };
    TestquestionsPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/testquestions/testquestions.html',
            pipes: [truncate_1.Truncate]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_1.ViewController, dementiasqlight_service_1.DementiaSqlightService])
    ], TestquestionsPage);
    return TestquestionsPage;
}());
exports.TestquestionsPage = TestquestionsPage;
