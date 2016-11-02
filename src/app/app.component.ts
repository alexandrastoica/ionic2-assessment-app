import { Component, enableProdMode } from "@angular/core";
import { App, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar, SQLite } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { RegistrationPage} from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { DementiaService } from '../services/dementia.service';
import { DementiaSQLiteService } from '../services/dementiasqlite.service';

@Component({
  template: '<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(public platform: Platform, public dementiaService: DementiaService,
    public dementiasqlite: DementiaSQLiteService, public storage: Storage, public app: App) {
    //prepare platform
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      //initialise pouchdb
      this.dementiaService.initDB();
      //initialise SQLite
      this.dementiasqlite.initDB();
    });//platform
  }//constructor
}//export
