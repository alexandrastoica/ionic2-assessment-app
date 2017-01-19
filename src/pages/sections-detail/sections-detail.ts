import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { SectionsQuestionsPage } from "../sections-questions/sections-questions";
import { SQLiteService, CreateTest, Test } from '../../providers/sqlite';

@Component({
	templateUrl: 'sections-detail.html',
})
export class SectionsDetailPage{

	public section;
  public testId;
	public questionCount;
	public count;

	constructor(params: NavParams, public nav: NavController, public sqlite: SQLiteService,) {
		this.nav = nav;
    this.section = params.data.section;
		this.questionCount = this.section.questions.length;
		this.testId = params.data.testId;
	}

	ionViewDidEnter(){
		this.sqlite.getResultsBySectionTest(this.section.id, this.testId).then(data => {
			for (var i = 0; i < data.rows.length; i++) {
				let item = data.rows.item(i);
				this.count = item.count;
			}
    });
	}

	enterSection(questions, section) {
	    this.nav.push(SectionsQuestionsPage, { questions: questions, section: section, testId: this.testId });
	}
}
