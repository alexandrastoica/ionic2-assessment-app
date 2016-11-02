import {Component} from "@angular/core";
import {Profile} from '../profile/profile';
import {Tests} from '../tests/tests';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Tests;
  tab2Root: any = Profile;

}
