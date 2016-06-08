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
		console.log(this.maxN);
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
}
