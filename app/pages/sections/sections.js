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
var core_1 = require("@angular/core");
var get_data_1 = require("../../providers/get-data/get-data");
var sections_detail_1 = require("../sections-detail/sections-detail");
var ionic_angular_1 = require('ionic-angular');
var login_1 = require("../login/login");
var Sections = (function () {
    function Sections(getData, nav, navParams) {
        this.getData = getData;
        this.nav = nav;
        this.navParams = navParams;
        this.load();
        this.nav = nav;
        this.testId = this.navParams.get('testId');
    }
    Sections.prototype.load = function () {
        var _this = this;
        this.getData.load()
            .then(function (data) {
            _this.sections = data;
        });
    };
    Sections.prototype.navigate = function (section) {
        this.nav.push(sections_detail_1.SectionsDetailPage, { testId: this.testId, section: section });
    };
    Sections.prototype.logout = function () {
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
        this.nav.push(login_1.LoginPage);
        //  this.nav.popToRoot();
    };
    Sections = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/sections/sections.html',
            providers: [get_data_1.GetData]
        }), 
        __metadata('design:paramtypes', [get_data_1.GetData, ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], Sections);
    return Sections;
}());
exports.Sections = Sections;
