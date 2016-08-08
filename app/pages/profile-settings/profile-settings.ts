import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, Storage, LocalStorage, App} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {RegistrationPage} from '../registration/registration';
import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/profile-settings/profile-settings.html',
})

export class ProfileSettings {
  	public user;
    public local;

  	constructor(public nav: NavController, public params: NavParams, public view: ViewController, public app: App) {
        this.local = new Storage(LocalStorage);
        this.user = params.data.user;
  	}

  	edit(): void {
  		this.nav.push(RegistrationPage, {
  			user: this.user
  		});
  	}

  	logout() {
    	this.local.remove('email');
      this.local.set('tutorialDone', false);
      
      this.app.getRootNav().push(LoginPage);
	}
}
