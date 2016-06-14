import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

/*
  Generated class for the RegistrationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/registration/registration.html',
})
export class RegistrationPage {
    constructor(public nav: NavController) {
        this.nav = nav;
    }

    enterTabsPage() {
        this.nav.push(TabsPage);
    }
}
