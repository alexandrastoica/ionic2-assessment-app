import {Component} from '@angular/core';
import {Modal, NavParams, ViewController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
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
    public isoDate = '';

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private dementiaService: DementiaService) {
    }

    ionViewLoaded() {
        this.user = this.navParams.get('user');

        if (!this.user) {
            this.user = {
                "Name": user.Name,
                "Email": user.Email
            };
        }
        else {
            this.isNew = false;
            this.action = 'Edit';
            //this.isoDate = this.user.Date.toISOString().slice(0, 10);
        }
    }

    save() {
       // this.user.Date = new Date(this.isoDate);

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

    /*enterTabsPage() {
        this.nav.push(TabsPage);
    }*/

}
