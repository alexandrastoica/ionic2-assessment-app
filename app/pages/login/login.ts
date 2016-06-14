import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {RegistrationPage} from "../registration/registration";
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  constructor(public nav: NavController) {
    this. nav = nav;
  }

   enterTabsPage() {
        this.nav.push(TabsPage);
    }

   enterRegisterPage() {
       this.nav.push(RegistrationPage);
   }

}
