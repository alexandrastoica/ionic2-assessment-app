import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { Data } from '../providers/data'
import { Pouch } from '../providers/pouchdb';
import { SQLiteService } from '../providers/sqlite';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, storage: Storage, public sql: SQLiteService, pouch: Pouch, data: Data) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
