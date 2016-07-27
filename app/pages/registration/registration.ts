import {Component} from '@angular/core';
import {Modal, NavParams, NavController, ViewController, Platform, Toast, Storage, LocalStorage} from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";
import {DementiaService} from '../../services/dementia.service';


@Component({
  templateUrl: 'build/pages/registration/registration.html',
})
export class RegistrationPage {
    public user;
    public isNew = true;
    public action = 'Add';
    public title = "Registration";
    public local;

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
        private dementiaService: DementiaService, public nav: NavController) {

        //this.platform = platform;
        this.authForm = fb.group({
           // 'title': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'FirstName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'LastName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'Email': ['', Validators.compose([Validators.required, Validators.minLength(2)])],

        });
        
        this.FirstName = this.authForm.controls['FirstName'];
        this.LastName = this.authForm.controls['LastName'];
        this.Email = this.authForm.controls['Email'];

        //set localstorage
        this.local = new Storage(LocalStorage);
    }

    ionViewLoaded() {
        this.user = this.navParams.get('user');
        console.log("reg / update user is " + JSON.stringify(this.user));

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
            this.title = 'Edit Details';
            //console.log("user exisits");
        }
    }

    onSubmit(value): void {
      if(this.isNew) {
        if(this.authForm.valid) {
              this.local.set('email', value.Email);
             // console.log("email is " + window.localStorage.getItem('Email'));
             this.save();
             let toast = Toast.create({
              message: 'Thank you for registering. You are now able to login',
              duration: 300
             });
            this.nav.present(toast);
        }
      } else {
         this.save();
         let toast = Toast.create({
              message: 'User details updated',
              duration: 300
             });
            this.nav.present(toast);
      }
    }

    save() {
       if (this.isNew) {
            this.dementiaService.addUser(this.user);
               // .catch(console.error.bind(console));
        } else {
        this.dementiaService.updateData(this.user);
            //.catch(console.error.bind(console));
        }
        this.dismiss();
    }

    delete() {
        this.dementiaService.removeData(this.user);
        console.log("calllleedd delete");
          let toast = Toast.create({
              message: 'Account has been deleted',
              duration: 300
             });
            this.nav.present(toast);
            this.nav.push(LoginPage);

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.user);
    }

}
