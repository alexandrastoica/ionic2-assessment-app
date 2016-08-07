import {Component} from '@angular/core';
import {Page, NavController, NavParams, ToastController} from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Sections} from "../sections/sections";
import {DementiaSQLiteService, Test} from '../../services/dementiasqlite.service';

@Component({
  templateUrl: 'build/pages/sections-questions/sections-questions.html',
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class SectionsQuestionsPage {
	public questions;
	public section;
	public answer;
    public total;
	public question: Test = null;
	public currentQuestion;
	public n; maxN;
	questionForm: FormGroup;
    public testId;
    public local;
    public score;

	constructor(private fb: FormBuilder, params: NavParams, public nav: NavController, 
		private dementiaSqlService: DementiaSQLiteService, private toastCtrl: ToastController) {
		this.nav = nav;
		this.section = params.data.section;
        this.questions = params.data.questions;
		this.testId = params.data.testId;
		this.maxN = this.questions.length;
        this.n = params.data.next_question?params.data.next_question:0;
		this.currentQuestion = this.questions[this.n];

        this.questionForm = fb.group({
            'score': ['', Validators.required]
        }); 
	}
	
	onSubmit(value: string): void {
		console.log(this.score);
        this.next();
    }

    saveTest(showBadge: boolean = false)
    {
        this.question = new Test(this.section.id, this.currentQuestion, this.score, this.n+1, this.testId);

		this.dementiaSqlService.add(this.question);
		this.dementiaSqlService.update(this.question);
        let toast = this.toastCtrl.create({
            message: 'Answer score was saved',
            duration: 20
         });
        toast.present();
    }

	next(){
		//save test and reset answer
		this.saveTest(true);
		this.score = null;

		//if more questions increment n and replace question
		if(this.n < this.maxN - 1){
            this.n += 1;
			this.currentQuestion = this.questions[this.n];
		} else {
			//else reset and go to sections page, passing the test id
            this.n = 0;
            this.currentQuestion = null;
			this.nav.push(Sections,  {testId: this.testId});
		}
	}

	//moves to previous section-question
	previous() {
		//this the n (start count) is less than the question length
		if(this.n > 0) {
			this.n -= 1; //then decrement the value (moves to previous question)
			//current question is then equal to the equal question count
			this.currentQuestion = this.questions[this.n];
		} else {
			//if the start count is less than 0 (i.e start question) 
			//take user back to the sections
			this.nav.push(Sections,  {testId: this.testId});
		}
	}

}
