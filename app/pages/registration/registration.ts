import {Component, forwardRef} from '@angular/core';
import {Modal, NavParams, NavController, ViewController, Platform, ToastController, Storage, LocalStorage} from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators, NG_VALIDATORS} from '@angular/forms';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";
import {DementiaService} from '../../services/dementia.service';
import {ValidationService} from '../../services/validation.service';


@Component({
  templateUrl: 'build/pages/registration/registration.html',
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [DementiaService]
})

export class RegistrationPage {
    public user;
    public isNew = true;
    public action = 'Add';
    public title = "Registration";
    public local;

    authForm: FormGroup;

    constructor(private fb: FormBuilder, private viewCtrl: ViewController,
        private navParams: NavParams, platform: Platform,
        private dementiaService: DementiaService, public nav: NavController,
        private toastCtrl: ToastController) {

        this.authForm = fb.group({
            'title': [['Mr', 'Mrs', 'Miss']],
            'firstname': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'lastname': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'email': ['', Validators.compose([Validators.required, ValidationService.validateEmail])],
            'role': [''],
            'job': [''],
            'organisation': [''],
            'department': ['']
        });

        //set localstorage
        this.local = new Storage(LocalStorage);
    }

    ionViewLoaded() {
        this.user = this.navParams.get('user');

        if (!this.user) {
            this.user = {
              //leave this scope empty and just:
              //object: use this to append properties in the view (registration.html) for adding to the database
              //example [(ngMODEL)]="user.number"
            };
            this.user.title = "Mr"; //default
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
          this.local.set('email', value.email);
          this.save();
          let toast = this.toastCtrl.create({
              message: 'Thank you for registering. You are now able to login',
              duration: 600
          });
          toast.present();
      } else {
          this.save();
          let toast = this.toastCtrl.create({
              message: 'User details updated',
              duration: 600
             });
          toast.present();
      }
    }

    save() {  
       if (this.isNew) {
            this.dementiaService.addUser(this.user);//.catch(console.error.bind(console));
        } else {
            this.dementiaService.updateData(this.user);//.catch(console.error.bind(console));
        }
        this.dismiss();
    }

    delete() {
        this.dementiaService.removeData(this.user);
        //console.log("calllleedd delete");
          let toast = this.toastCtrl.create({
              message: 'Account has been deleted',
              duration: 600
             });
            toast.present();
            this.nav.push(LoginPage);

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.user);
    }

}
