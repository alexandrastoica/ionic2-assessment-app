import { Component, NgZone } from '@angular/core';
import { ModalController, NavController, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Welcome } from "../welcome/welcome";
import { TabsPage } from "../tabs/tabs";
import { Pouch } from '../../providers/pouchdb';
import { RegistrationPage } from "../registration/registration";
import { ValidationService } from '../../providers/validation';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
    userForm: FormGroup;
    public email;
    public users = [];
    public local;
    public done;

    constructor(public fb: FormBuilder, public nav: NavController,
        public pouch: Pouch, public platform: Platform, public storage: Storage,
        public zone: NgZone, public toastCtrl: ToastController, public modalCtrl: ModalController) {

        this.userForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, ValidationService.validateEmail])]
        });

        this.storage.get('tutorialDone').then( (data:any) => {
            if (data != null) this.done = JSON.parse(data);
        });

        //this.pouch.initDB();
    }

    onSubmit(value): void {
        let found = false;

        this.pouch.getUserData().then(data => {
            this.zone.run(() => {
                this.users = data;
                for (let user of this.users) {
                    if (value.email == user._id) {
                        found = true;
                        this.storage.set('email', user._id);
                        console.log("found " + found);
                        return;
                    }
                }
            });
            if (found == true) {//User was found
                if (this.done == true) {
                    this.nav.setRoot(TabsPage);
                } else {
                    this.nav.push(Welcome);
                }
            } else {
                // console.log('User not found!');
                let toast = this.toastCtrl.create({
                    message: 'Sorry email doesn\'t exist, please try again',
                    duration: 600
                });
                toast.present();
            }
        }).catch(console.error.bind(console));
    }

    register() {
        let modal = this.modalCtrl.create(RegistrationPage);
        modal.present();
    }

}
