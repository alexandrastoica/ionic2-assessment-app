import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite } from 'ionic-native';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { Profile } from '../pages/profile/profile';
import { ProfileSettings } from '../pages/profile-settings/profile-settings';
import { Sections } from '../pages/sections/sections';
import { SectionsDetailPage } from '../pages/sections-detail/sections-detail';
import { SectionsQuestionsPage } from '../pages/sections-questions/sections-questions';
import { Tests } from '../pages/tests/tests';
import { TestsDetailPage } from '../pages/tests-detail/tests-detail';
import { TestsQuestionsPage } from '../pages/tests-questions/tests-questions';
import { Welcome } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';

import { GetData } from '../providers/get-data/get-data'
import { DementiaService } from '../services/dementia.service';
import { DementiaSQLiteService, Test, CreateTest } from '../services/dementiasqlite.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegistrationPage,
    Profile,
    ProfileSettings,
    Sections,
    SectionsDetailPage,
    SectionsQuestionsPage,
    Tests,
    TestsDetailPage,
    TestsQuestionsPage,
    Welcome,
    TabsPage,
    Test,
    CreateTest
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
    ProfileSettings,
    Sections,
    SectionsDetailPage,
    SectionsQuestionsPage,
    Tests,
    TestsDetailPage,
    TestsQuestionsPage,
    Welcome,
    TabsPage
  ],
  providers: [SQLite, Storage, DementiaService, DementiaSQLiteService, GetData]
})
export class AppModule {}
