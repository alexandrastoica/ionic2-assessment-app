import {Page, NavController, NavParams} from 'ionic-angular';
import {SectionsQuestionsPage} from "../sections-questions/sections-questions";

@Page({
	templateUrl: 'build/pages/sections-detail/sections-detail.html',
})

export class SectionsDetailPage {

	public section;

	constructor(params: NavParams, public nav: NavController) {
		this.nav = nav;
		this.section = params.data.section;
	}

    enterSection(questions, section) {
        this.nav.push(SectionsQuestionsPage, { questions: questions, section: section });
    }
}
