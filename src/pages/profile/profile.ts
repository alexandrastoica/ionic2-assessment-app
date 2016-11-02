import {Component, NgZone} from "@angular/core";
import {Modal, NavController, Platform, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {DementiaService} from '../../services/dementia.service';
import {RegistrationPage} from '../registration/registration';
import {LoginPage} from '../login/login';
import {ProfileSettings} from '../profile-settings/profile-settings';

@Component({
  templateUrl: 'profile.html',
})

export class Profile {
    public user = [];
    public local;

    constructor(public dementiaService: DementiaService, private nav: NavController, private platform: Platform,
        public storage: Storage, private zone: NgZone, private navparams: NavParams) {

    }

    ionViewDidLoad() {
        this.storage.get('email').then((currentUser) => {
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
