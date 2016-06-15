import {Component} from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {Sections} from "../sections/sections";

@Page({
  templateUrl: 'build/pages/sections-questions/sections-questions.html',
})

export class SectionsQuestionsPage {
	public questions;
	public section;
	public currentQuestion;
	public n = 0; maxN;

	constructor(params: NavParams, public nav: NavController) {
		this.nav = nav;
		this.section = params.data.section;
		this.questions = params.data.questions;
		this.maxN = this.questions.length;
		//console.log(this.maxN);
		this.currentQuestion = this.questions[this.n];
	}

	next(){
		if(this.n < this.maxN - 1){
			this.n += 1;
			this.currentQuestion = this.questions[this.n];
		} else {
			this.nav.push(Sections);
		}
	}

	//moves to previous section-question
	previous() {
		//this the n (start count) is less than the question length
		if(this.n < this.maxN - 1){
			this.n -= 1; //then decrement the value (moves to previous question)
			//current question is then equal to the equal question count
			this.currentQuestion = this.questions[this.n];
			//if the start count is less than 1 -1 (i.e start question) take user back
			//to the sections (stops the count going to -1, -2 etc)
			 if(this.n < 1 - 1) {
				this.nav.push(Sections);
				//console.log("n" + this.n);
			}
		} else { //if first conditional statement fails take user back to the sections
			this.nav.push(Sections);
		}

	}
}
