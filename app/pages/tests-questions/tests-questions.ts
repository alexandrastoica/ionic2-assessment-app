import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DementiaSQLiteService, Test} from '../../services/dementiasqlite.service';

@Component({
  templateUrl: 'build/pages/tests-questions/tests-questions.html'
})

export class TestsQuestionsPage {
    sections: Test[];
    public section;
    public id;

  constructor(public nav: NavController, private navParams: NavParams, public dementiaSqlService: DementiaSQLiteService){
      this.section = this.navParams.get('section');
      this.id = this.navParams.get('id');
  }

  ionViewLoaded() {
      this.dementiaSqlService.getBySection(this.section.section, this.id.id).then(data => {
          this.sections = [];
          if (data.res.rows.length > 0) {
            for (var i = 0; i < data.res.rows.length; i++) {
              let item = data.res.rows.item(i);
              this.sections.push(new Test(item.section, item.question, item.score, item.question_id, item.id));
            }
          }
      });
    }
}
