import {Component} from '@angular/core';
import {Modal, NavController} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl }  from '@angular/common';
import {TabsPage} from "../tabs/tabs";
import {DementiaService} from '../../services/dementia.service';
import {RegistrationPage} from "../registration/registration";
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES]
})
export class LoginPage {

  authForm: ControlGroup;
  email: AbstractControl;

  constructor(fb: FormBuilder, public nav: NavController, private dementiaService: DementiaService)
  {
       this. nav = nav;
       this.dementiaService.initDB();

         this.authForm = fb.group({
             'email': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
         });
         this.email = this.authForm.controls['email'];
  }


  onSubmit(value: string): void {
      if(this.authForm.valid) {

        //window.localStorage.setItem('email', value.email);

        //DO pouchDB email validation here
        //if email from JSON stored data is equal to the email enter
        //push users to tabs page
        //else
        //stay on login page and state email address is invalid

        this.nav.push(TabsPage);
      }
  }



   enterTabsPage() {
        this.nav.push(TabsPage);
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
