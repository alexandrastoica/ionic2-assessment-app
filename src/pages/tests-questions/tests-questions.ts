import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLiteService, Test } from '../../providers/sqlite';

@Component({
  templateUrl: 'tests-questions.html'
})
export class TestsQuestionsPage {
    sections: Test[];
    public section;
    public id;

  constructor(public nav: NavController, private navParams: NavParams, public sqliteService: SQLiteService){
      this.section = this.navParams.get('section');
      this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
      this.sqliteService.getBySection(this.section.section, this.id.id).then(data => {
          this.sections = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              let item = data.rows.item(i);
              this.sections.push(new Test(item.section, item.question, item.score, item.question_id, item.id));
            }
          }
      });
    }
}
