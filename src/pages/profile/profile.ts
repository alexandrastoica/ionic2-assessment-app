import { Component, NgZone } from "@angular/core";
import { NavController, Platform, NavParams, App, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pouch } from '../../providers/pouchdb';
import { RegistrationPage } from '../registration/registration';
import { LoginPage } from '../login/login';
import { Welcome } from '../welcome/welcome';

@Component({
  templateUrl: 'profile.html',
})
export class Profile {
    public user;
    public local;

    constructor(public pouch: Pouch, public nav: NavController, public platform: Platform, public modalCtrl: ModalController,
        public storage: Storage, public zone: NgZone, public navparams: NavParams, public app: App) {

          this.user = {
            firstname: '',
            lastname: '',
            email: ''
          };

          this.storage.get('email').then((currentUser) => {
              this.pouch.getCurrentUserData(currentUser).then(data => {
                  this.zone.run(() => {
                      this.user = data;
                  });
              }).catch(console.error.bind(console));
          });

    }

    ionViewDidLoad() {

    }

    edit(): void {
      let modal = this.modalCtrl.create(RegistrationPage, { user: this.user });
      modal.present();
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
