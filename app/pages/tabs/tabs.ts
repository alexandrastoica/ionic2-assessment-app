import {Component} from "@angular/core";
import {Sections} from '../sections/sections';
import {Profile} from '../profile/profile';
import {Tests} from '../tests/tests';
import {HomePage} from '../home/home';
import {CreateTestPage} from '../create-test/create-test';
import {DisplayCreatedTestsPage} from '../display-created-tests/display-created-tests';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Sections;
  tab2Root: any = Profile;
  tab3Root: any = Tests;
  tab4Root: any = HomePage;
  tab5Root: any = CreateTestPage;
  tab6Root: any = DisplayCreatedTestsPage;
}
