import { Component, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { App, NavParams, NavController, ViewController, Platform, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from "../login/login";
import { Pouch } from '../../providers/pouchdb';
import { SQLiteService } from '../../providers/sqlite';
import { ValidationService } from '../../providers/validation';

@Component({
  templateUrl: 'registration.html'
})
export class RegistrationPage {
    public user;
    public users = [];
    public isNew = true;
    public action = 'Add';
    public local;
    public titletab = "Registration";
    registerForm: FormGroup;

    constructor(public formBuilder: FormBuilder, public viewCtrl: ViewController, public navParams: NavParams,
        public platform: Platform,
        public app: App, public storage: Storage,
        public pouch: Pouch, public sqlite: SQLiteService, public nav: NavController,
        public toastCtrl: ToastController, public alertCtrl: AlertController, public zone:NgZone) {

          this.user = this.navParams.get('user');

          if (!this.user) {
            this.user = {
              firstname: '',
              lastname: '',
              email: ''
            };
          }
          else {
              this.isNew = false;
              this.action = 'Edit';
              this.titletab = 'Edit Details';
          }

          this.registerForm = this.formBuilder.group({
              firstname: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
              lastname: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
              email: ['', Validators.compose([Validators.required, ValidationService.validateEmail])]
          });
    }

    ionViewDidLoad() {
        console.log(this.user);
    }

    onSubmit(value): void {
        if(this.isNew) {
          let found = false;
          this.pouch.getUserData().then(data => {
              this.zone.run(() => {
                this.users = data;
                for(let user of this.users){
                  if(this.registerForm.value.email == user._id){
                    found = true;
                    console.log('email', user._id);
                    console.log("found " + found);
                    return;
                  }
                }
              });
              if (found == true) {//User was found
                    let toast = this.toastCtrl.create({
                          message: 'Sorry that email already exists',
                          duration: 600
                         });
                      toast.present();
              } else {
                 console.log("not a user" + found);
                   console.log("didnt find a matching email");
                   this.storage.set('email', value.email);
                    this.save();
                    let toast = this.toastCtrl.create({
                        message: 'Thank you for registering. You are now able to login',
                        duration: 600
                    });
                    toast.present();
                    this.viewCtrl.dismiss();
              }
          }).catch(console.error.bind(console));
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
            this.pouch.addUser(this.user);//.catch(console.error.bind(console));
        } else {
            this.pouch.updateData(this.user);//.catch(console.error.bind(console));
        }
        this.dismiss();
    }

    delete() {
      //create confirm box to prevent the user from accidentally deleting teir account
      let confirm = this.alertCtrl.create({
        title: 'Delete Account',
        message: 'Are you sure you want to delete your account? All data will be erased.',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Disagree clicked');
              confirm.dismiss();
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              confirm.dismiss().then(() => {
                this.deleteUser();
              });
            }//end handler
          }
        ]
      });//end alert

      //show alert
      confirm.present();
    }

    deleteUser(){
        let toast = this.toastCtrl.create({
            message: 'Account has been deleted',
            duration: 600
        });
        toast.present().then(() => {
            this.storage.remove('email');
            this.storage.set('tutorialDone', false);
            //go back to login page
            this.app._setRootNav(LoginPage);

            //delete from database
            this.sqlite.deleteData(this.user._id); // delete data of tests by user
            this.sqlite.deleteTestByUser(this.user._id); // delete tests by user

            this.pouch.removeData(this.user._id); //delete the account

        });
    }

    dismiss() {
        this.viewCtrl.dismiss(this.user);
    }

}
