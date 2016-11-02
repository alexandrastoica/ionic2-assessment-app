import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { SectionsQuestionsPage } from "../sections-questions/sections-questions";

@Component({
	templateUrl: 'sections-detail.html',
})

export class SectionsDetailPage {

	public section;
    public testId;

	constructor(params: NavParams, public nav: NavController) {
		this.nav = nav;
        this.section = params.data.section;
		this.testId = params.data.testId;

	}

    enterSection(questions, section) {
        this.nav.push(SectionsQuestionsPage, { questions: questions, section: section, testId: this.testId });
    }
}
