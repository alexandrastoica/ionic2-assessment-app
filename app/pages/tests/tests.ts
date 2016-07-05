import {Modal, Page, Platform, NavController} from 'ionic-angular';
import {DementiaSqlightService, Test} from '../../services/dementiasqlight.service';
import {SectionsQuestionsPage} from "../sections-questions/sections-questions";
import {TestquestionsPage} from "../testquestions/testquestions";
import {Truncate} from '../../pipes/truncate';

@Page({
  templateUrl: 'build/pages/tests/tests.html',
  pipes: [Truncate]
})

export class Tests {
    tests: Test[];
    name: string;

  constructor(public dementiaSqlService: DementiaSqlightService, private platform: Platform, public nav: NavController)
  {

  }

   ionViewLoaded() {
       // this.platform.ready().then(() => {
           this.tests = [];
            this.dementiaSqlService.get()
            .then(
              data => {
                this.tests = [];
                if (data.res.rows.length > 0) {
                  for (var i = 0; i < data.res.rows.length; i++) {
                    let item = data.res.rows.item(i);
                    this.tests.push(new Test(item.section, item.question, item.score, item.question_id, item.id));
                  }
                }
            });
      //  });
    }

     showDetail(section) {
        let modal = Modal.create(TestquestionsPage, {
            section: section
        });
        this.nav.present(modal);

        modal.onDismiss(() => {
        });
    }
}
