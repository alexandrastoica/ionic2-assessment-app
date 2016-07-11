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
var ionic_angular_1 = require('ionic-angular');
var dementia_service_1 = require('../../services/dementia.service');
var registration_1 = require('../registration/registration');
var Profile = (function () {
    function Profile(dementiaService, nav, platform, zone) {
        this.dementiaService = dementiaService;
        this.nav = nav;
        this.platform = platform;
        this.zone = zone;
        this.users = [];
        this.user = [];
        this.currentUser = window.localStorage.getItem('Email');
    }
    Profile.prototype.ionViewLoaded = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // this.dementiaService.initDB();
            //this.dementiaService.getCurrentUserData();
            _this.dementiaService.getCurrentUserData(_this.currentUser)
                .then(function (data) {
                _this.zone.run(function () {
                    _this.user = data;
                    console.log(data);
                });
            })
                .catch(console.error.bind(console));
        });
    };
    Profile.prototype.showDetail = function (user) {
        var modal = ionic_angular_1.Modal.create(registration_1.RegistrationPage, {
            user: user
        });
        this.nav.present(modal);
        modal.onDismiss(function () {
        });
    };
    Profile = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/profile/profile.html',
        }), 
        __metadata('design:paramtypes', [dementia_service_1.DementiaService, ionic_angular_1.NavController, ionic_angular_1.Platform, core_1.NgZone])
    ], Profile);
    return Profile;
}());
exports.Profile = Profile;
