import {Component, enableProdMode} from "@angular/core";
import {App, Platform, ionicBootstrap, SqlStorage, Storage} from 'ionic-angular';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {StatusBar, SQLite} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {RegistrationPage} from './pages/registration/registration';
import {LoginPage} from './pages/login/login';
import {DementiaService} from './services/dementia.service';
import {DementiaSQLiteService} from './services/dementiasqlite.service';

@Component({
  template: '<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>',
  providers: [DementiaService, DementiaSQLiteService]
})
export class MyApp {
  rootPage: any = LoginPage;
  public storage;

  constructor(public platform: Platform, public dementiaService: DementiaService) {

    //prepare platform
    this.platform.ready().then(() => {

      StatusBar.styleDefault();
      console.log("platform ready");

      //initialise sql storage
      this.storage = new Storage(SqlStorage);

      //initialise tables
      this.storage.query('CREATE TABLE IF NOT EXISTS tests (id INTEGER PRIMARY KEY AUTOINCREMENT, name Text, user_id Text, date TIMESTAMP)').then((data) =>{
        console.log("TESTS TABLE CREATED", JSON.stringify(data.res));
      }, (error) => {
        console.log("Error creating tests table", JSON.stringify(error.err));
      });

      this.storage.query('CREATE TABLE IF NOT EXISTS test_sections (id INTEGER PRIMARY KEY AUTOINCREMENT, section INTEGER, question TEXT, score TEXT, question_id INTEGER, test_id INTEGER, CONSTRAINT composite_id UNIQUE (section, question_id, test_id))').then((data) =>{
        console.log("TEST SECTIONS TABLE CREATED", JSON.stringify(data.res));
      }, (error) => {
        console.log("Error creating tests table", JSON.stringify(error.err));
      });

      //initialise pouchdb
      this.dementiaService.initDB();

      //enableProdMode();
    
    });//platform

  }//constructor

}//export

ionicBootstrap(MyApp, [
    disableDeprecatedForms(),
    provideForms()
  ], {
   // tabSubPages: false //allow tabs to show up on child page on android
});
