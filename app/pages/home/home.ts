import {Component, NgZone} from "@angular/core";
import {Modal, NavController, Platform} from 'ionic-angular';
import {DementiaService} from '../../services/dementia.service';
import {RegistrationPage} from '../registration/registration';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    public users = [];

    constructor(private dementiaService: DementiaService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone) {

    }

    ionViewLoaded() {
        this.platform.ready().then(() => {
           // this.dementiaService.initDB();

            this.dementiaService.getAllData()
                .then(data => {
                    this.zone.run(() => {
                        this.users = data;
                        //console.log("users " + JSON.stringify(this.users));

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
