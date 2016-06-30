import {Component} from '@angular/core';
import {Modal, NavParams, ViewController, Platform} from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
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
  directives: [FORM_DIRECTIVES]
})
export class RegistrationPage {
    public user;
    public isNew = true;
    public action = 'Add';

    authForm: ControlGroup;
   // title: AbstractControl;
    FirstName: AbstractControl;
    LastName: AbstractControl;
    Email: AbstractControl;

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
        this.authForm = fb.group({
           // 'title': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'FirstName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'LastName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'Email': ['', Validators.compose([Validators.required, Validators.minLength(2)])],

        });

       // this.title = this.authForm.controls['title'];
        this.FirstName = this.authForm.controls['FirstName'];
        this.LastName = this.authForm.controls['LastName'];
        this.Email = this.authForm.controls['Email'];
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
 
    onSubmit(value): void {
        if(this.authForm.valid) {
              window.localStorage.setItem('Email', value.Email);
             // console.log("email is " + window.localStorage.getItem('Email'));
             this.save();
        }
    }

    save() {
       if (this.isNew) {
            this.dementiaService.addUser(this.user);
            //.catch(console.error.bind(console));
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
}
