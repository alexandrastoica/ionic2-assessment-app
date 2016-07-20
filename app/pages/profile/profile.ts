import {Component, NgZone} from "@angular/core";
import {Modal, NavController, Platform, Storage, LocalStorage} from 'ionic-angular';
import {DementiaService} from '../../services/dementia.service';
import {RegistrationPage} from '../registration/registration';
import {LoginPage} from '../login/login';
import {ProfileSettings} from '../profile-settings/profile-settings';


@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class Profile {
public users = [];
public user = [];
public currentUser;
public local;

    constructor(private dementiaService: DementiaService, private nav: NavController, private platform: Platform, private zone: NgZone) {
    	this.local = new Storage(LocalStorage);
        this.local.get('email').then((data) => {
            this.currentUser = data;
        });
    }

    ionViewLoaded() {
        console.log(this.currentUser);
        this.dementiaService.getCurrentUserData(this.currentUser)
            .then(data => {
                this.zone.run(() => {
                    this.user = data;
                    //console.log(data);
                });
            }).catch(console.error.bind(console));
    }

    showDetail(user) {
        this.nav.push(ProfileSettings, {
            user: user
        });
    }

    logout(): void {
        this.local.remove('email');
        this.nav.push(LoginPage);
    }
}
