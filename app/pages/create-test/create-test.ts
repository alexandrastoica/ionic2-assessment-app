import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DementiaSqlightService, CreateTest} from '../../services/dementiasqlight.service';
import {Sections} from "../sections/sections";
/*
  Generated class for the CreateTestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/create-test/create-test.html',
})
export class CreateTestPage {
    public createTest;
    public name;

  constructor(public nav: NavController, private dementiaSqlService: DementiaSqlightService) {
  }

  public saveTest()
  {
      this.createTest = new CreateTest(0, this.name, '', 0);
      this.dementiaSqlService.insertCreateTest(this.createTest).then(data => {
        let id = data.res.insertId;
        this.nav.push(Sections, {testId: id});
      });
  }


}
