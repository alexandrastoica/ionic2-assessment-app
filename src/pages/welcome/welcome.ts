import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'welcome.html',
})
export class Welcome {

	public local;

	constructor(public nav: NavController, public storage: Storage) {
	}

	skip(){
		this.storage.set('tutorialDone', 'true');
		this.nav.setRoot(TabsPage);
	}
}
