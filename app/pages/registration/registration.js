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
var dementia_service_1 = require('../../services/dementia.service');
/*
  Generated class for the RegistrationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var RegistrationPage = (function () {
    /* authForm: ControlGroup;
     name: AbstractControl;
     email: AbstractControl;
     role: AbstractControl;
     jobTitle: AbstractControl;
     Organization: AbstractControl;
     Department: AbstractControl; */
    function RegistrationPage(fb, viewCtrl, navParams, platform, dementiaService) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dementiaService = dementiaService;
        this.isNew = true;
        this.action = 'Add';
        //this.platform = platform;
        this.authForm = fb.group({
            // 'title': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'FirstName': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(2)])],
            'LastName': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(2)])],
            'Email': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(2)])],
        });
        // this.title = this.authForm.controls['title'];
        this.FirstName = this.authForm.controls['FirstName'];
        this.LastName = this.authForm.controls['LastName'];
        this.Email = this.authForm.controls['Email'];
    }
    RegistrationPage.prototype.ionViewLoaded = function () {
        this.user = this.navParams.get('user');
        if (!this.user) {
            this.user = {};
        }
        else {
            this.isNew = false;
            this.action = 'Edit';
        }
    };
    RegistrationPage.prototype.onSubmit = function (value) {
        if (this.authForm.valid) {
            window.localStorage.setItem('Email', value.Email);
            // console.log("email is " + window.localStorage.getItem('Email'));
            this.save();
        }
    };
    RegistrationPage.prototype.save = function () {
        if (this.isNew) {
            this.dementiaService.addData(this.user)
                .catch(console.error.bind(console));
        }
        else {
            this.dementiaService.updateData(this.user)
                .catch(console.error.bind(console));
        }
        this.dismiss();
    };
    RegistrationPage.prototype.delete = function () {
        this.dementiaService.removeData(this.user)
            .catch(console.error.bind(console));
        this.dismiss();
    };
    RegistrationPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss(this.user);
    };
    RegistrationPage.prototype.showThing = function () {
        this.dementiaService.test();
    };
    RegistrationPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/registration/registration.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, ionic_angular_1.ViewController, ionic_angular_1.NavParams, ionic_angular_1.Platform, dementia_service_1.DementiaService])
    ], RegistrationPage);
    return RegistrationPage;
}());
exports.RegistrationPage = RegistrationPage;
