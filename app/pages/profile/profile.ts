import {Component, NgZone} from "@angular/core";
import {Modal, NavController, Platform, Storage, LocalStorage, NavParams} from 'ionic-angular';
import {DementiaService} from '../../services/dementia.service';
import {RegistrationPage} from '../registration/registration';
import {LoginPage} from '../login/login';
import {ProfileSettings} from '../profile-settings/profile-settings';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})

export class Profile {
    public user = [];
    public local;

    constructor(public dementiaService: DementiaService, private nav: NavController, private platform: Platform, 
        private zone: NgZone, private navparams: NavParams) {
    	this.local = new Storage(LocalStorage);
    }

    ionViewLoaded() {
        this.local.get('email').then((currentUser) => {
            this.dementiaService.getCurrentUserData(currentUser).then(data => {
                this.zone.run(() => {
                    this.user = data;
                });
            }).catch(console.error.bind(console));
        });
    }

    showDetail(user) {
        this.nav.push(ProfileSettings, {
            user: user
        });
    }
}
