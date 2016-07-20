import {Component} from '@angular/core';
import {NavController, Storage, LocalStorage} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/welcome/welcome.html',
})
export class Welcome {

	public local;

	constructor(public nav: NavController) {
		this.local = new Storage(LocalStorage);
	}

	skip(){
		this.local.set('tutorialDone', 'true');	
		this.nav.push(TabsPage);
	}
}
