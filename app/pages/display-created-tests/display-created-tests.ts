import {Component} from '@angular/core';
import {Modal, NavController} from 'ionic-angular';
import {DementiaSqlightService, CreateTest} from '../../services/dementiasqlight.service';
import {Tests} from '../tests/tests';
import {Sections} from "../sections/sections";
import {SectionsQuestionsPage} from "../sections-questions/sections-questions";
import {GetData} from "../../providers/get-data/get-data";
import {CreateTestPage} from "../create-test/create-test";


@Component({
  templateUrl: 'build/pages/display-created-tests/display-created-tests.html',
  providers: [GetData]
})
export class DisplayCreatedTestsPage {
  createdTests: CreateTest[];
  public questionCount = 0;
  public numberofQuestionsAnswered;
  public numberOfQuestionsTheSectionHas;
  public getData;
  public user_id;


  constructor(public getdata: GetData, public nav: NavController, public dementiaSqlService: DementiaSqlightService) {
    this.dementiaSqlService.refreshDataSet();
    this.getData = getdata;
    this.user_id = window.localStorage.getItem('Email');

    this.getData.load().then(data => {
      for (var i = 0; i < data.length; i++) {
        this.questionCount += data[i].questions.length;
      }
    });
  }

  getItems(ev) {
    //TODO: write search function
  }

  onPageDidEnter() {
      this.createdTests = [];
      this.dementiaSqlService.getCreatedTests(this.user_id).then(data => {
          if (data.res.rows.length > 0) {
            for (var i = 0; i < data.res.rows.length; i++) {
              let item = data.res.rows.item(i);
              this.dementiaSqlService.getAnsweredQuestions(item.id).then(data => {
                if (item) {
                  let percentage = ((data.res.rows.length / this.questionCount) * 100).toFixed(1);
                  this.createdTests.push(new CreateTest(item.id, item.name, item.user_id, item.date, percentage));
                }
              });
            }
          }
      });
      
  }

  createAssesment(){
      //create modal for assesment creation
      let modal = Modal.create(CreateTestPage);
      this.nav.present(modal);

      //on dismiss if data not empty, push Section page to navigation and pass testid
      modal.onDismiss(data => {
        if(data){
          this.nav.push(Sections, {testId: data});
        }
      });
  }

  showDetail(id){
    this.nav.push(Tests, {id: id});
  }

  showDetailSection(createdtest) {
    let id = createdtest.id;
    this.dementiaSqlService.getAnsweredQuestions(id).then(
      data => {
        let item = data.res.rows[data.res.rows.length-1];
        if (!item) {
          this.nav.push(Sections, {
            testId: id
          });
        } else {
        this.getData.getBySectionId(item.section)
          .then(data => {
           // console.log(data.questions);
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
