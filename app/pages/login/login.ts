import {Component, NgZone} from '@angular/core';
import {Modal, NavController, Platform} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl }  from '@angular/common';
import {TabsPage} from "../tabs/tabs";
import {DementiaService} from '../../services/dementia.service';
import {RegistrationPage} from "../registration/registration";
import { ControlMessages } from '../../components/control-messages component';
import { ValidationService } from '../../services/validation.service';


@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [ControlMessages]
})
export class LoginPage {
  userForm: any;
 public email;

  constructor(private _formBuilder: FormBuilder, public nav: NavController,
              private dementiaService: DementiaService,  private platform: Platform, private zone:NgZone)
  {
       this. nav = nav;
       this.dementiaService.initDB();


       this.userForm = this._formBuilder.group({
          'email': ['', Validators.compose([Validators.required,  Validators.minLength(1), ValidationService.emailValidator])]
       });
  }




  /*onSubmit(value: string): void {
      if(this.authForm.valid) {

        //window.localStorage.setItem('email', value.email);
      }
  }*/
   submit() {
    if (this.userForm.dirty && this.userForm.valid) {
      //console.log(`Email: ${this.userForm.value.email}`);

     // console.log("email is " + JSON.stringify(this.dementiaService.getAllData()));
        //DO pouchDB email validation here
        //if email from JSON stored data is equal to the email enter
        //push users to tabs page
        //else
        //stay on login page and state email address is invalid

        if(this.userForm.value.email ) {
             this.nav.push(TabsPage);
        } else {
          console.log("invalid email");
        }

    }
  }


   enterRegisterPage() {
       this.nav.push(RegistrationPage);
   }

    showDetail(user) {
      let modal = Modal.create(RegistrationPage, { user: user });
      this.nav.present(modal);

      modal.onDismiss(() => {
        //goto login
        //his.nav.push(TabsPage);
     });
    }

}
