import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DementiaSqlightService, Test} from '../../services/dementiasqlight.service';

@Component({
  templateUrl: 'build/pages/test-questions/test-questions.html'
})

export class TestQuestionsPage {

    sections: Test[];
    public section;
    public id;

  constructor(public nav: NavController, private navParams: NavParams,
              private viewCtrl: ViewController, public dementiaSqlService: DementiaSqlightService)
   {
           this.section = this.navParams.get('section');
           this.id = this.navParams.get('id');
           //this.id = 1;
   }

  ionViewLoaded() {
        //this.sections = [];
            this.dementiaSqlService.getBySection(this.section.section, this.id.id)
            .then(
              data => {
                this.sections = [];
                if (data.res.rows.length > 0) {
                  for (var i = 0; i < data.res.rows.length; i++) {
                    let item = data.res.rows.item(i);
                    this.sections.push(new Test(item.section, item.question, item.score, item.question_id, item.id));
                  }
                }
            });
             //console.log("id for test  is " + JSON.stringify(this.id.id));
    }
}
