import {Component, ViewChild} from '@angular/core';
import {Content, ViewController, NavController, NavParams, ToastController} from 'ionic-angular';
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
    public total;
	public question: Test = null;
	public currentQuestion;
	public n; maxN;
	questionForm: FormGroup;
    public testId;
    public local;
    public score;

    @ViewChild(Content) content: Content;

	constructor(private fb: FormBuilder, params: NavParams, public nav: NavController, public view: ViewController,
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

	ionViewDidEnter(){
		// In case the user has already completed this question of this test, let them know what they answered
		this.getScore();
	}
	
	onSubmit(value: string): void {
		//prevent user from submitting the form without an answer
		if(this.questionForm.valid){
			//save test then skip to next page
			this.saveTest(true);
		}
    }

    saveTest(showBadge: boolean = false)
    {
        this.question = new Test(this.section.id, this.currentQuestion, this.score, this.n+1, this.testId);

		this.dementiaSqlService.add(this.question);
		this.dementiaSqlService.update(this.question);

        let toast = this.toastCtrl.create({
            message: 'Answer score was saved',
            duration: 600
         });

        //skip to next page after saving
        toast.present().then(() => {
        	this.next();
        });        
    }

    getScore(){
    	this.dementiaSqlService.getScore(this.testId, this.n+1, this.section.id).then(data => {
			if(data.res.rows.length > 0){
          		this.score = data.res.rows.item(0).score;
			} else {
				this.score = null;
			}
		}).catch(console.error.bind(console));
    }

	//move to next sections-questions page
	next(){
		// Scroll to top to make easier and faster for the user to view the question
		this.content.scrollToTop();

		//if more questions increment n and replace question
		if(this.n < this.maxN - 1){
            this.n += 1;
			this.currentQuestion = this.questions[this.n];
			// In case the user has already completed this question of this test, let them know what they answered
			this.getScore();
		} else {
			//sections page, passing the test id and reset values
			this.nav.push(Sections,  {testId: this.testId}).then(() => {				
				this.n = 0;
	            this.currentQuestion = null;
			});
		}
	}

	//moves to previous sections-questions page
	previous() {
		// Scroll to top to make easier and faster for the user to view the question
		this.content.scrollToTop();

		//this the n (start count) is less than the question length
		if(this.n > 0) {
			this.n -= 1; //then decrement the value (moves to previous question)
			//current question is then equal to the equal question count
			this.currentQuestion = this.questions[this.n];
			// In case the user has already completed this question of this test, let them know what they answered
			this.getScore();
		} else {
			//if the start count is less than 0 (i.e start question) 
			//take user back to the sections
			this.nav.push(Sections,  {testId: this.testId});
		}
	}

}
