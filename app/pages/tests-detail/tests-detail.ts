import {Modal, Page, Platform, NavController, NavParams, ViewController} from 'ionic-angular';
import {DementiaSQLiteService, Test} from '../../services/dementiasqlite.service';
import {SectionsQuestionsPage} from "../sections-questions/sections-questions";
import {TestsQuestionsPage} from "../tests-questions/tests-questions";

@Page({
  templateUrl: 'build/pages/tests-detail/tests-detail.html'
})

export class TestsDetailPage {
    tests: Test[];
    public id;

  constructor(public dementiaSqlService: DementiaSQLiteService, private platform: Platform, 
    public nav: NavController, private navParams: NavParams, private viewCtrl: ViewController){
     this.id = this.navParams.get('id');
  }

   ionViewLoaded() {
       this.tests = [];
        this.dementiaSqlService.get(this.id.id).then(data => {
            if (data.res.rows.length > 0) {
              for (var i = 0; i < data.res.rows.length; i++) {
                let item = data.res.rows.item(i);
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
