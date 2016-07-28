import {Component} from '@angular/core';
import {Modal, NavController, Storage, LocalStorage, Alert} from 'ionic-angular';
import {EmailComposer} from 'ionic-native';
import {DementiaSqlightService, CreateTest} from '../../services/dementiasqlight.service';
import {Tests} from '../tests/tests';
import {Sections} from "../sections/sections";
import {SectionsQuestionsPage} from "../sections-questions/sections-questions";
import {GetData} from "../../providers/get-data/get-data";

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
  public searchQuery;


  constructor(public getdata: GetData, public nav: NavController, public dementiaSqlService: DementiaSqlightService) {
    this.dementiaSqlService.refreshDataSet();
    this.getData = getdata;

    //get current user from local storage
    this.local = new Storage(LocalStorage);
    this.local.get('email').then((data) => {
        this.user_id = data;
    });

    //get total number of questions available for the assesment
    this.getData.load().then(data => {
      for (var i = 0; i < data.length; i++) {
        this.questionCount += data[i].questions.length;
      }
    });

  }

  ionViewDidEnter() {
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

  export(){
    EmailComposer.isAvailable().then((available) =>{
     if(available) {
       //Now we know we can send
     }
    });

    let email = {
      to: 'alexandra.stoica95@yahoo.com',
      cc: '',
      bcc: '',
      attachments: [
        'file://img/logo.png'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

    // Send a text message using default options
    EmailComposer.open(email);
  }

  createAssesment(){
      //create prompt to allow the user enter the assessment location and create a new assesment
      let prompt = Alert.create({
          title: 'Create assessment',
          message: "Enter a location for the new assessment",
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

    //create confirm box to prevent the user from accidentally deleting an assessment
    let confirm = Alert.create({
      title: 'Delete Assessment',
      message: 'Are you sure you want to delete this assessment?',
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
            this.dementiaSqlService.deleteTest(test.id); //delete the test
            this.dementiaSqlService.deleteAnswers(test.id); //delete all the answers for that test
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
    console.log("called showdetailsection");
    let id = createdtest.id;
    this.dementiaSqlService.getAnsweredQuestions(id).then(
      data => {
        let item = data.res.rows[data.res.rows.length-1];
        console.log("item is " + JSON.stringify(item));
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
