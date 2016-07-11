import {Component} from '@angular/core';
import {Modal, NavController} from 'ionic-angular';
import {DementiaSqlightService, CreateTest} from '../../services/dementiasqlight.service';
import {Tests} from '../tests/tests';
import {Sections} from "../sections/sections";
import {SectionsQuestionsPage} from "../sections-questions/sections-questions";
import {GetData} from "../../providers/get-data/get-data";
/*
  Generated class for the DisplayCreatedTestsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/display-created-tests/display-created-tests.html',
  providers: [GetData]
})
export class DisplayCreatedTestsPage {
  createdTests: CreateTest[];
  public questionCount;
  public numberofQuestionsAnswered;
  public numberOfQuestionsTheSectionHas;
  public getData;


  constructor(public getdata: GetData, public nav: NavController, public dementiaSqlService: DementiaSqlightService) {
    /*this.getData.load().then(data => {
      this.questionCount = data.questions.length;
    }); */
    // let percentage = ((numberOfQuestionsAnswerd / numberOfQuestionTheSectionHas)  x 100)
    this.getData = getdata;


  }

  ionViewLoaded() {
       // this.platform.ready().then(() => {
           this.createdTests = [];
            this.dementiaSqlService.getCreatedTests()
            .then(
              data => {
                this.createdTests = [];
                if (data.res.rows.length > 0) {
                  for (var i = 0; i < data.res.rows.length; i++) {
                    let item = data.res.rows.item(i);
                    this.createdTests.push(new CreateTest(item.id, item.name, item.date));
                  }
                }
            });
      //  });
    }

   showDetail(id) {
        let modal = Modal.create(Tests, {
            id: id
        });
        this.nav.present(modal);

        modal.onDismiss(() => {
        });
    }

    showDetailSection(createdtest) {
      let id = createdtest.id;
      this.dementiaSqlService.getLastQuestion(id).then(
        data => {
          let item = data.res.rows[data.res.rows.length-1];
          if (!item) {
            this.nav.push(Sections, {
              testId: id
            });
          } else {
          this.getData.getBySectionId(item.section)
            .then(data => {
              console.log(data.questions);
              if(data.questions.length >= (item.question_id + 1)) {
                this.nav.push(SectionsQuestionsPage, {
                  section: data,
                  questions: data.questions,
                  testId: item.test_id,
                  next_question: item.question_id
                });
              } else {
                this.nav.push(Sections, {
                  testId: item.test_id
                });
              }
            });
          }
        });
    }

}
