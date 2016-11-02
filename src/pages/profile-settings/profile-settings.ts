import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
import { Welcome } from '../welcome/welcome';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'profile-settings.html',
})

export class ProfileSettings {
  	public user;
    public local;

  	constructor(public nav: NavController, public params: NavParams, public view: ViewController, public app: App, public storage: Storage) {
        this.user = params.data.user;
  	}

  	edit(): void {
  		this.nav.push(RegistrationPage, {
  			user: this.user
  		});
  	}

    tutorial() {
      this.app.getRootNav().push(Welcome);
    }

  	logout() {
    	this.storage.remove('email');
      this.storage.set('tutorialDone', false);

      this.app.getRootNav().push(LoginPage);
	}
}
