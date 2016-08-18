import {Component} from '@angular/core';
import {Platform, Modal, ViewController, NavController, Storage, LocalStorage, AlertController} from 'ionic-angular';
import {EmailComposer, File} from 'ionic-native';
import {DementiaSQLiteService, CreateTest, Test} from '../../services/dementiasqlite.service';
import {TestsDetailPage} from '../tests-detail/tests-detail';
import {Sections} from "../sections/sections";
import {SectionsQuestionsPage} from "../sections-questions/sections-questions";
import {GetData} from "../../providers/get-data/get-data";

declare var window;
declare var cordova: any;

@Component({
  templateUrl: 'build/pages/tests/tests.html',
  providers: [GetData]
})

export class Tests {
  createdTests: CreateTest[];
  tests: Test[];
  public questionCount = 0;
  public user_id;
  public local;
  public createTest;
  public id;
  public app_data;
  public x;

  constructor(public platform: Platform, public getData: GetData, public nav: NavController,
          public view: ViewController, public dementiaSqlService: DementiaSQLiteService,
          public alertCtrl: AlertController) {

    //init database
    this.platform.ready().then(() => {
      this.dementiaSqlService.refreshDataSet();
    });

    //get current user from local storage
    this.local = new Storage(LocalStorage);
    this.local.get('email').then((data) => {
        this.user_id = data;
    });

    //get total number of questions available for the assesment
    this.getData.load().then(data => {
      this.app_data = data; //save all the data
      for (var i = 0; i < data.length; i++) {
        this.questionCount += data[i].questions.length;
      }
    });

    this.createdTests = [];

  }

  ionViewDidEnter(){
    //initialise created tests and get them from SQL service
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

  showError() {
    let alert = this.alertCtrl.create({
      title: 'Something went wrong.',
      subTitle: 'The app is unable to export at the moment, please try again.',
      buttons: ['OK']
    });
    alert.present();
  }
  
  export(test){

    let body = "Assesment Date: " + test.date + "<BR> Assessment Location: " + test.name + "<BR><BR>";
    let table = "<table style='font-size: 12pt'><tr><th>Section</th><th>Question</th><th>Score</th></tr>";
    let tableHTML = "<table width='100%' style='width: 100% !important; min-width: 100%; border: 1px solid black; border-collapse: collapse;'><tr><th style='border: 1px solid black; border-collapse: collapse;'>Section</th><th style='border: 1px solid black; border-collapse: collapse;'>Question</th><th style='border: 1px solid black; border-collapse: collapse;'>Score</th></tr>";

    var tab_text = '\uFEFF';
    tab_text = tab_text + '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    tab_text = tab_text + '<head>';
    tab_text = tab_text + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    tab_text = tab_text + '<meta name="ProgId" content="Excel.Sheet" />';
    tab_text = tab_text + '<meta name="Generator" content="Microsoft Excel 11" />';
    tab_text = tab_text + '<title>Assessment_details_' + test.date + '</title>';
    tab_text = tab_text +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    tab_text = tab_text + '<x:Name>Assessment_details_' + test.date + '</x:Name>';
    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook>';
    tab_text = tab_text + '</xml><![endif]--></head><body>';

    this.dementiaSqlService.getResults(test.id).then(data => {
        if (data.res.rows.length > 0) {
          for (let i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            table += '<tr><td>' + item.section + '</td><td>' + item.question_id + '</td><td style="text-align: right;">' + item.score + '</td></tr>';
            tableHTML += "<tr><td style='padding: 5px; border: 1px solid black; border-collapse: collapse; text-align: center;'>" + item.section + "</td><td style='padding: 5px; border: 1px solid black; border-collapse: collapse; text-align: center;'>" + item.question_id + "</td><td style='padding: 5px; border: 1px solid black; border-collapse: collapse; text-align: center;'>" + item.score + '</td></tr>';
          }
        } // if

        let emailbody = body + tableHTML + '</table>';
        let template = tab_text + table + '</table></body></html>';

        this.platform.ready().then(() => {
              let pathToFile = cordova.file.dataDirectory;
      
              window.resolveLocalFileSystemURL(pathToFile, function(dir) {
                dir.getFile("assessment_details.xls", {create:true}, function(file) {
                    file.createWriter(function(fileWriter) {
                        
                        let blob = new Blob([template], { type: 'application/vnd.ms-excel' });
                        fileWriter.write(blob); 
                        pathToFile += 'assessment_details.xls';

                        EmailComposer.isAvailable().then((available) => {
                            if(EmailComposer.isAvailable){
                                let email = {
                                  attachments: [
                                    pathToFile
                                  ],
                                  subject: 'Assessment Details',
                                  body: emailbody,
                                  isHtml: true
                                };
                                // Send a text message using default options
                                EmailComposer.open(email); 
                            } else { console.log("EMAIL NOT AVAILABLE"); this.showError(); }

                        });

                    }, function(e){ console.error(e); this.showError(); });
                });
              });

        }); //platform
      }); //sql service
  } //export

  createAssesment(){
      //create prompt to allow the user enter the assessment location and create a new assesment
      let prompt = this.alertCtrl.create({
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
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
                prompt.dismiss();
              }
            },
            {
              text: 'Save',
              handler: data => {
                //if saved, call saveTest function to save the test
                console.log('Saved clicked', data.location);
                // check if location has been submitted first
                if(data.location){
                  //dismiss and saveTest
                  prompt.dismiss().then(() => {
                    this.saveTest(data.location);
                  });
                } else {
                  //dismiss the prompt
                  prompt.dismiss();
                }
              }
            }
          ]
      });
      prompt.present();
  }

  saveTest(name) {
      console.log('called saveTest');
      //create new object with data
      this.createTest = new CreateTest(0, name, this.user_id, '', '');
      console.log("created test" + JSON.stringify(this.createTest));
      //call the service to insert the new test in by passing the data
      this.dementiaSqlService.insertCreateTest(this.createTest).then(data => {
        console.log("insertedCreateTest");
        this.id = data.res.insertId;
        //console.log(this.id);
        //redirect the user to the sections page to begin the test
        this.nav.push(Sections, {testId: this.id});
      });

  }

  showDetail(id){
    this.nav.push(TestsDetailPage, {id: id});
  }

  deleteTest(test){
    //create confirm box to prevent the user from accidentally deleting an assessment
    let confirm = this.alertCtrl.create({
      title: 'Delete Assessment',
      message: 'Are you sure you want to delete this assessment?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
            confirm.dismiss();
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            //console.log('Agree clicked');
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
    confirm.present();
  }

  resume(createdtest) {
      let testId = createdtest.id; //get test id

      this.dementiaSqlService.getLast(testId).then(data => {
          // Get last record of test
          if(data.res.rows.length > 0){
              let item = data.res.rows.item(0);
              let section = this.app_data[item.section-1]; //get the section from app data
              // If not the last question from the section, go to next question
              if(section.questions.length >= (item.question_id + 1)) {
                this.nav.push(SectionsQuestionsPage, {
                    section: section,
                    questions: section.questions,
                    testId: item.test_id,
                    next_question: item.question_id
                });
              } else {
                // Go to sections menu
                this.nav.push(Sections, {
                  testId: testId
                });
              }
          } else {
              // No answered questions for this test, go to sections menu
              this.nav.push(Sections, {
                testId: testId
              });
          }
      });
  }
}
