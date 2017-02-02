import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Storage } from '@ionic/storage';
import { SQLite } from 'ionic-native';

//pages
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { Profile } from '../pages/profile/profile';
import { Sections } from '../pages/sections/sections';
import { SectionsDetailPage } from '../pages/sections-detail/sections-detail';
import { SectionsQuestionsPage } from '../pages/sections-questions/sections-questions';
import { Tests } from '../pages/tests/tests';
import { TestsDetailPage } from '../pages/tests-detail/tests-detail';
import { TestsQuestionsPage } from '../pages/tests-questions/tests-questions';
import { Welcome } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';

//providers
import { Data } from '../providers/data'
import { Pouch } from '../providers/pouchdb';
import { SQLiteService } from '../providers/sqlite';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegistrationPage,
    Profile,
    Sections,
    SectionsDetailPage,
    SectionsQuestionsPage,
    Tests,
    TestsDetailPage,
    TestsQuestionsPage,
    Welcome,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegistrationPage,
    Profile,
    Sections,
    SectionsDetailPage,
    SectionsQuestionsPage,
    Tests,
    TestsDetailPage,
    TestsQuestionsPage,
    Welcome,
    TabsPage
  ],
  providers: [Storage, SQLite, Data, SQLiteService, Pouch, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
