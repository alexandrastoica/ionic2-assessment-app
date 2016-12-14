import { Component, NgZone } from "@angular/core";
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pouch } from '../../providers/pouchdb';
import { ProfileSettings } from '../profile-settings/profile-settings';

@Component({
  templateUrl: 'profile.html',
})
export class Profile {
    public user;
    public local;

    constructor(public pouch: Pouch, public nav: NavController, public platform: Platform,
        public storage: Storage, public zone: NgZone, public navparams: NavParams) {

          this.user = {
            title: 'Mr',
            firstname: '',
            lastname: '',
            email: '',
            role: '',
            job: '',
            organisation: '',
            department: ''
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

    showDetail(user) {
        this.nav.push(ProfileSettings, {
            user: user
        });
    }
}
