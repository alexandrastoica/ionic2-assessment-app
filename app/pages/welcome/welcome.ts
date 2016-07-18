import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

/*
  Generated class for the WelcomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/welcome/welcome.html',
})
export class Welcome {
	isNewTest: any;
	constructor(public nav: NavController) {
			
	}

	skip(){
		this.nav.push(TabsPage);
	}
}
