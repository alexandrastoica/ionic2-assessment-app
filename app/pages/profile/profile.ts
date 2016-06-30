import {Component, NgZone} from "@angular/core";
import {Modal, NavController, Platform} from 'ionic-angular';
import {DementiaService} from '../../services/dementia.service';
import {RegistrationPage} from '../registration/registration';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class Profile {
public users = [];
public user = [];
public currentUser;



    constructor(private dementiaService: DementiaService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone) {

    		this.currentUser = window.localStorage.getItem('Email');
    }

    ionViewLoaded() {
        this.platform.ready().then(() => {
           // this.dementiaService.initDB();

           //this.dementiaService.getCurrentUserData();

            this.dementiaService.getCurrentUserData(this.currentUser)
                .then(data => {
                    this.zone.run(() => {
                        this.user = data;
                        console.log(data);
                    });
                })
                .catch(console.error.bind(console));
        });
    }

    showDetail(user) {
        let modal = Modal.create(RegistrationPage, {
            user: user
        });
        this.nav.present(modal);

        modal.onDismiss(() => {
        });
    }
}
