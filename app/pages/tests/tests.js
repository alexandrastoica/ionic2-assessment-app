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
var dementiasqlight_service_1 = require('../../services/dementiasqlight.service');
var testquestions_1 = require("../testquestions/testquestions");
var truncate_1 = require('../../pipes/truncate');
var Tests = (function () {
    function Tests(dementiaSqlService, platform, nav, navParams, viewCtrl) {
        this.dementiaSqlService = dementiaSqlService;
        this.platform = platform;
        this.nav = nav;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.id = this.navParams.get('id');
    }
    Tests.prototype.ionViewLoaded = function () {
        var _this = this;
        // this.platform.ready().then(() => {
        this.tests = [];
        this.dementiaSqlService.get(this.id.id)
            .then(function (data) {
            _this.tests = [];
            if (data.res.rows.length > 0) {
                for (var i = 0; i < data.res.rows.length; i++) {
                    var item = data.res.rows.item(i);
                    _this.tests.push(new dementiasqlight_service_1.Test(item.section, item.question, item.score, item.question_id, item.id));
                }
            }
        });
        //  });
        // console.log("id is " + JSON.stringify(this.id.id));
    };
    Tests.prototype.showDetail = function (section) {
        var modal = ionic_angular_1.Modal.create(testquestions_1.TestquestionsPage, {
            section: section,
            id: this.id
        });
        this.nav.present(modal);
        modal.onDismiss(function () {
        });
    };
    Tests.prototype.dismiss = function () {
        this.viewCtrl.dismiss(this.id);
    };
    Tests = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/tests/tests.html',
            pipes: [truncate_1.Truncate]
        }), 
        __metadata('design:paramtypes', [dementiasqlight_service_1.DementiaSqlightService, ionic_angular_1.Platform, ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_1.ViewController])
    ], Tests);
    return Tests;
}());
exports.Tests = Tests;
