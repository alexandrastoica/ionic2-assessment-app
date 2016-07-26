import {Component} from '@angular/core';
import {NavController, NavParams, Storage, LocalStorage} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {RegistrationPage} from '../registration/registration';


@Component({
  templateUrl: 'build/pages/profile-settings/profile-settings.html',
})
export class ProfileSettings {
  	public user;
    public local;

  	constructor(public nav: NavController, public params: NavParams) {
        this.local = new Storage(LocalStorage);
        this.user = params.data.user;

       //console.log("selected user is " + JSON.stringify(this.user));
  	}

  	edit(): void {
  		this.nav.push(RegistrationPage, {
  			user: this.user
  		});
  	}

  	logout(): void {
    	this.local.remove('email');
    	this.nav.push(LoginPage);
	}
}
