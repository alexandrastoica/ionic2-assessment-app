import {Component, forwardRef, NgZone} from '@angular/core';
import {App, NavParams, NavController, ViewController, Platform, ToastController, AlertController, Storage, LocalStorage} from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators, NG_VALIDATORS} from '@angular/forms';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";
import {DementiaService} from '../../services/dementia.service';
import {DementiaSQLiteService} from '../../services/dementiasqlite.service';
import {ValidationService} from '../../services/validation.service';


@Component({
  templateUrl: 'build/pages/registration/registration.html',
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [DementiaService, DementiaSQLiteService]
})

export class RegistrationPage {
    public user;
    public users = [];
    public isNew = true;
    public action = 'Add';
    public title = "Registration";
    public local;

    authForm: FormGroup;

    constructor(private fb: FormBuilder, private viewCtrl: ViewController,
        private navParams: NavParams, public platform: Platform, public app: App,
        private dementiaService: DementiaService, public sqlite: DementiaSQLiteService, public nav: NavController,
        private toastCtrl: ToastController, private alertCtrl: AlertController, private zone:NgZone) {

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

        //init database
        this.platform.ready().then(() => {
          this.sqlite.refreshDataSet();
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
        }
    }

    onSubmit(value): void {
        if(this.isNew) {
          let found = false;
          this.dementiaService.getUserData().then(data => {
                  this.zone.run(() => {
                      this.users = data;
                    for(let user of this.users){
                      if(this.authForm.value.email == user._id){
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
                       this.local.set('email', value.email);
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
            this.dementiaService.addUser(this.user);//.catch(console.error.bind(console));
        } else {
            this.dementiaService.updateData(this.user);//.catch(console.error.bind(console));
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
            this.local.remove('email');
            this.local.set('tutorialDone', false);
            //go back to login page
            this.app.setRootNav(LoginPage);

            //delete from database
            this.sqlite.deleteData(this.user._id); // delete data of tests by user
            this.sqlite.deleteTestByUser(this.user._id); // delete tests by user

            this.dementiaService.removeData(this.user._id); //delete the account
            
        });
    }

    dismiss() {
        this.viewCtrl.dismiss(this.user);
    }

}
