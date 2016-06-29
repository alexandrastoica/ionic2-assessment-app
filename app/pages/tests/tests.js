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
var Tests = (function () {
    function Tests(dementiaService, zone, platform) {
        this.dementiaService = dementiaService;
        this.zone = zone;
        this.platform = platform;
        this.answers = [];
    }
    Tests.prototype.ionViewLoaded = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // this.dementiaService.initDB();
            _this.dementiaService.getAllData()
                .then(function (data) {
                _this.zone.run(function () {
                    _this.answers = data;
                    // console.log(" data is " + JSON.stringify(this.answers));
                });
            })
                .catch(console.error.bind(console));
        });
    };
    Tests = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/tests/tests.html'
        }), 
        __metadata('design:paramtypes', [dementia_service_1.DementiaService, core_1.NgZone, ionic_angular_1.Platform])
    ], Tests);
    return Tests;
}());
exports.Tests = Tests;
