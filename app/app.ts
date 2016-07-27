import {Component} from "@angular/core";
import {Platform, ionicBootstrap, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {RegistrationPage} from './pages/registration/registration';
import {LoginPage} from './pages/login/login';
import {DementiaService} from './services/dementia.service';
import {DementiaSqlightService} from './services/dementiasqlight.service';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [DementiaService, DementiaSqlightService]
})
export class MyApp {
  rootPage: any = LoginPage;
  constructor(platform: Platform, public nav: NavController, public dementiaService: DementiaService, public dementiaSqlService: DementiaSqlightService) {
	  platform.ready().then(() => {
		  // Okay, so the platform is ready and our plugins are available.
		  // Here you can do any higher level native things you might need.
           this.dementiaService.initDB();
           this.dementiaSqlService.refreshDataSet();
           this.nav.setRoot(LoginPage);
		  StatusBar.styleDefault();
	  });
  }
}

ionicBootstrap(MyApp);
