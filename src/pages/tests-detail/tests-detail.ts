import { Component } from "@angular/core";
import { Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { SQLiteService, Test } from '../../providers/sqlite';
import { TestsQuestionsPage } from "../tests-questions/tests-questions";

@Component({
  templateUrl: 'tests-detail.html'
})
export class TestsDetailPage {
    tests: Test[];
    public id;

  constructor(public sqliteService: SQLiteService, private platform: Platform,
    public nav: NavController, private navParams: NavParams, private viewCtrl: ViewController){
     this.id = this.navParams.get('id');
     this.tests = [];
  }

   ionViewDidLoad() {
       this.tests = [];
        this.sqliteService.get(this.id.id).then(data => {
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                let item = data.rows.item(i);
                this.tests.push(new Test(item.section, item.question, item.score, item.question_id, item.id));
              }
            }
        });
    }

     showDetail(section) {
        this.nav.push(TestsQuestionsPage, {
            section: section,
            id: this.id
        });
    }
}
