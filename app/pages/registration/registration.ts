import {Component} from '@angular/core';
import {Modal, NavParams, ViewController, Platform} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl }  from '@angular/common';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";
import {DementiaService} from '../../services/dementia.service';

/*
  Generated class for the RegistrationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/registration/registration.html',
})
export class RegistrationPage {
    public user;
    public isNew = true;
    public action = 'Add';

   /* authForm: ControlGroup;
    name: AbstractControl;
    email: AbstractControl;
    role: AbstractControl;
    jobTitle: AbstractControl;
    Organization: AbstractControl;
    Department: AbstractControl; */

    constructor(fb: FormBuilder, private viewCtrl: ViewController,
        private navParams: NavParams, platform: Platform,
        private dementiaService: DementiaService) {


        //this.platform = platform;
    }

    ionViewLoaded() {
        this.user = this.navParams.get('user');

        if (!this.user) {
            this.user = {
              //leave this scope empty and just:
              //object: use this to append properties in the view (registration.html) for adding to the database
              //example [(ngMODEL)]="user.number"
            };
        }
        else {
            this.isNew = false;
            this.action = 'Edit';
        }
    }

    save() {
        if (this.isNew) {
            this.dementiaService.addData(this.user)
                .catch(console.error.bind(console));
        } else {
            this.dementiaService.updateData(this.user)
                .catch(console.error.bind(console));
        }

        this.dismiss();
    }

    delete() {
        this.dementiaService.removeData(this.user)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.user);
    }

    showThing()
    {
        this.dementiaService.test();
    }

    showToast(message, position) {
        this.platform.ready().then(() => {
            window.plugins.toast.show(message, "short", position);
        });
    }
}
