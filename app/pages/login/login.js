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
var common_1 = require('@angular/common');
var tabs_1 = require("../tabs/tabs");
var dementia_service_1 = require('../../services/dementia.service');
var registration_1 = require("../registration/registration");
var control_messages_component_1 = require('../../components/control-messages component');
var validation_service_1 = require('../../services/validation.service');
var LoginPage = (function () {
    function LoginPage(_formBuilder, nav, dementiaService, platform, zone) {
        this._formBuilder = _formBuilder;
        this.nav = nav;
        this.dementiaService = dementiaService;
        this.platform = platform;
        this.zone = zone;
        this.users = [];
        this.nav = nav;
        this.dementiaService.initDB();
        this.userForm = this._formBuilder.group({
            'email': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(1), validation_service_1.ValidationService.emailValidator])]
        });
    }
    LoginPage.prototype.submit = function () {
        var _this = this;
        if (this.userForm.dirty && this.userForm.valid) {
            this.dementiaService.getUserData().then(function (data) {
                _this.zone.run(function () {
                    _this.users = data;
                    for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                        var user = _a[_i];
                        // console.log(user);
                        if (_this.userForm.value.email == user._id) {
                            window.localStorage.setItem('Email', user._id);
                            _this.nav.push(tabs_1.TabsPage);
                        }
                        else {
                            var toast = ionic_angular_1.Toast.create({
                                message: 'Sorry username is isn\'t correct. ',
                                duration: 500
                            });
                            _this.nav.present(toast);
                        }
                    }
                });
            }).catch(console.error.bind(console));
        }
    };
    LoginPage.prototype.enterRegisterPage = function () {
        this.nav.push(registration_1.RegistrationPage);
    };
    LoginPage.prototype.showDetail = function (user) {
        var modal = ionic_angular_1.Modal.create(registration_1.RegistrationPage, { user: user });
        this.nav.present(modal);
        modal.onDismiss(function () {
            //goto login
            //his.nav.push(TabsPage);
        });
    };
    LoginPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/login/login.html',
            directives: [control_messages_component_1.ControlMessages]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, ionic_angular_1.NavController, dementia_service_1.DementiaService, ionic_angular_1.Platform, core_1.NgZone])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
