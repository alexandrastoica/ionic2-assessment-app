import {Component} from '@angular/core';
import {Page, NavController, NavParams, Toast} from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
import {Sections} from "../sections/sections";
import {DementiaSqlightService, Test} from '../../services/dementiasqlight.service';

@Page({
  templateUrl: 'build/pages/sections-questions/sections-questions.html',
  directives: [FORM_DIRECTIVES]
})

export class SectionsQuestionsPage {
	public questions;
	public section;
	public answer;
    public total;
	public question: Test = null;
	public currentQuestion;
	public n = 0; maxN;
    //public id;
	questionForm: ControlGroup;
    Validate: AbstractControl;

    public testId;

	constructor(private fb: FormBuilder, params: NavParams, public nav: NavController, private dementiaSqlService: DementiaSqlightService) {
		this.nav = nav;
		this.section = params.data.section;
        this.questions = params.data.questions;
		this.testId = params.data.testId;
        console.log("quess" + this.questions);
		this.maxN = this.questions.length;
        this.n = params.data.next_question?params.data.next_question:0;
		this.currentQuestion = this.questions[this.n];
		//this.question = {};

		//this.platform = platform;
        this.questionForm = fb.group({
            'Validate': ['', Validators.compose([Validators.required])],
        });

        this.Validate = this.questionForm.controls['Validate'];

	}
	 onSubmit(value: string): void {
        if(this.questionForm.valid) {
             this.next();
        }
    }

    saveTest(showBadge: boolean = false)
    {
        this.question = new Test(this.section.id, this.currentQuestion, this.n+1, this.answer, this.testId);
        console.log(JSON.stringify(this.question));
        console.log(this.testId);
    	if(this.question)
        {

    		this.dementiaSqlService.add(this.question).then((data) =>
            {
    			//this.question.id = data.res["insertId"];
                let toast = Toast.create({
                    message: 'Answer score was saved',
                    duration: 300
                 });
                this.nav.present(toast);
    		});
    	} else
        {
    		this.dementiaSqlService.update(this.n, this.section.id);
            let toast = Toast.create({
                message: 'Answer score was updated',
                duration: 300
            });

             this.nav.present(toast);
    	}
    }

	next(){
		if(this.n < this.maxN - 1){
            this.saveTest(true);
            this.n += 1;
			this.currentQuestion = this.questions[this.n];
			this.answer = null;
		} else {
            this.saveTest(true);
            this.n = 0;
            this.currentQuestion = null;
            this.answer = null;
			this.nav.push(Sections,  {testId: this.testId});
		}
	}

	//moves to previous section-question
	previous() {
		//this the n (start count) is less than the question length
			if(this.n < this.maxN - 1)
			{
				this.n -= 1; //then decrement the value (moves to previous question)
				//current question is then equal to the equal question count
				this.currentQuestion = this.questions[this.n];
				//if the start count is less than 1 -1 (i.e start question) take user back
				//to the sections (stops the count going to -1, -2 etc)
				 if(this.n < 1 - 1)
				 {
					this.nav.push(Sections);
					//console.log("n" + this.n);
                    //this.answer = this.question.answer;
				 }
			} else { //if first conditional statement fails take user back to the sections
				this.nav.push(Sections);
		}//END OF PREVIOUS FUNCTION
	}

	/* private onPageWillUnload() {
	    this.saveTest(true);
	  }*/
}
