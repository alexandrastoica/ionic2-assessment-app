import {Component} from '@angular/core';
import {Modal, NavController, Storage, LocalStorage, Alert} from 'ionic-angular';
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
  public local;
  public createTest;
  public id;


  constructor(public getdata: GetData, public nav: NavController, public dementiaSqlService: DementiaSqlightService) {
    this.dementiaSqlService.refreshDataSet();
    this.getData = getdata;
    
    this.local = new Storage(LocalStorage);
    this.local.get('email').then((data) => {
        this.user_id = data;
    });

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
      /*//create modal for assesment creation - old version
      let modal = Modal.create(CreateTestPage, {
        user: this.user_id
      });

      this.nav.present(modal);

      //on dismiss if data not empty, push Section page to navigation and pass testid
      modal.onDismiss(data => {
        if(data){
          this.nav.push(Sections, {testId: data});
        }
      });*/

      //create prompt to allow the user enter the assesment location and create a new assesment
      let prompt = Alert.create({
          title: 'Create assesment',
          message: "Enter a location for the new assesment",
          inputs: [
            {
              name: 'location',
              placeholder: 'Location'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Save',
              handler: data => {
                //if saved, call saveTest function to save the test
                //console.log('Saved clicked', data.location);
                this.saveTest(data.location);
              }
            }
          ]
      });
      this.nav.present(prompt);
  }

  saveTest(name) {
      
      //create new object with data
      this.createTest = new CreateTest(0, name, this.user_id, '', '');
      //call the service to insert the new test in by passing the data
      this.dementiaSqlService.insertCreateTest(this.createTest).then(data => {
        this.id = data.res.insertId;
        console.log(this.id);
        //redirect the user to the sections page to begin the test 
        this.nav.push(Sections, {testId: this.id});  
      });
         
  }

  showDetail(id){
    this.nav.push(Tests, {id: id});
  }

  deleteTest(test){

    //create confirm box to prevent the user from accidentally deleting an assestement
    let confirm = Alert.create({
      title: 'Delete Assesment',
      message: 'Are you sure you want to delete this assesment?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Agree clicked');
            //delete from database
            this.dementiaSqlService.deleteTest(test.id);
            //delete from view
            for(let i = 0; i < this.createdTests.length; i++) {
              if(this.createdTests[i] == test){
                this.createdTests.splice(i, 1);
              }
            }//end for
          }//end handler
        }
      ]
    });//end alert

    this.nav.present(confirm);

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
