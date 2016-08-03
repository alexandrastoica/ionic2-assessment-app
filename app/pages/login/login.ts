import {Component, NgZone} from '@angular/core';
import {Modal, NavController, Platform, Toast, Storage, LocalStorage} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl}  from '@angular/common';
import {Welcome} from "../welcome/welcome";
import {TabsPage} from "../tabs/tabs";
import {DementiaService} from '../../services/dementia.service';
import {RegistrationPage} from "../registration/registration";
import {ControlMessages} from '../../components/control-messages component';
import {ValidationService} from '../../services/validation.service';


@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [ControlMessages]
})

export class LoginPage {
  userForm: any;
  public email;
  public users = [];
  public local;
  public done;
  public matches;

  constructor(private _formBuilder: FormBuilder, public nav: NavController,
              private dementiaService: DementiaService,  private platform: Platform, private zone:NgZone)
  {
       this.nav = nav;
       this.local = new Storage(LocalStorage);

       this.userForm = this._formBuilder.group({
          'email': ['', Validators.compose([Validators.required,  Validators.minLength(1), ValidationService.emailValidator])]
       });

       this.local.get('tutorialDone').then((data) => {
          if (data != null) this.done = JSON.parse(data);
       });
  }

  submit() {
    if (this.userForm.dirty && this.userForm.valid) {
      let found = false;
      this.dementiaService.getUserData().then(data => {
              this.zone.run(() => {
                  this.users = data;
                for(let user of this.users){
                  if(this.userForm.value.email == user._id){
                     found = true;
                      this.local.set('email', user._id);
                     console.log("found " + found);
                  }
                }
              });
              if (found == true) {//User was found
                if(this.done == true){
                    this.nav.push(TabsPage);
                } else {
                    this.nav.push(Welcome);
                }
              } else {
               // console.log('User not found!');
                  let toast = Toast.create({
                    message: 'Sorry email doesn\'t exist, please try again',
                    duration: 350
                 });
               this.nav.present(toast);
              }
          }).catch(console.error.bind(console));
        }
   }



    register() {
      let modal = Modal.create(RegistrationPage);
      this.nav.present(modal);

      modal.onDismiss(() => {
        //goto login
        //his.nav.push(TabsPage);
     });
    }

}
