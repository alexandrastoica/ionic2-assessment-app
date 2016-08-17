import {Component, NgZone} from '@angular/core';
import {ModalController, NavController, Platform, ToastController, Storage, LocalStorage} from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Welcome} from "../welcome/welcome";
import {TabsPage} from "../tabs/tabs";
import {DementiaService} from '../../services/dementia.service';
import {RegistrationPage} from "../registration/registration";
import {ValidationService} from '../../services/validation.service';

@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class LoginPage {
  userForm: FormGroup;
  public email;
  public users = [];
  public local;
  public done;

  constructor(private _formBuilder: FormBuilder, public nav: NavController,
              private dementiaService: DementiaService,  private platform: Platform,
              private zone:NgZone, private toastCtrl: ToastController, private modalCtrl: ModalController) {
       this.nav = nav;
       this.local = new Storage(LocalStorage);

       this.userForm = this._formBuilder.group({
          'email': ['', Validators.compose([Validators.required, ValidationService.validateEmail])]
       });

       this.local.get('tutorialDone').then((data) => {
          if (data != null) this.done = JSON.parse(data);
       });

       this.dementiaService.initDB();
  }

  onSubmit(value): void {
      let found = false;

      this.dementiaService.getUserData().then(data => {
              this.zone.run(() => {
                  this.users = data;
                for(let user of this.users){
                  if(value.email == user._id){
                    found = true;
                    this.local.set('email', user._id);
                    console.log("found " + found);
                    return;
                  }
                }
              });
              if (found == true) {//User was found
                if(this.done == true){
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
