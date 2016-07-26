import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {DementiaSqlightService, CreateTest} from '../../services/dementiasqlight.service';
import {Sections} from "../sections/sections";
import {TabsPage} from "../tabs/tabs"
 
@Component({
  templateUrl: 'build/pages/create-test/create-test.html',
})

export class CreateTestPage {
    public createTest;
    public name;
    public user_id;
    public id;

  constructor(public viewCtrl: ViewController, public nav: NavController, private dementiaSqlService: DementiaSqlightService) {
    this.user_id = window.localStorage.getItem('Email');
  }

  public saveTest()
  {
      
      this.createTest = new CreateTest(0, this.name, this.user_id, '', '');
      
      this.dementiaSqlService.insertCreateTest(this.createTest).then(data => {
        this.id = data.res.insertId;
        this.viewCtrl.dismiss(this.id);
       // this.nav.parent.select(1); 
       // this.nav.push(Sections, {testId: id});
      });      

      
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
