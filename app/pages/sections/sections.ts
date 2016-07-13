import {Component} from "@angular/core";
import {GetData} from "../../providers/get-data/get-data";
import {SectionsDetailPage} from "../sections-detail/sections-detail";
import {Page, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";


@Component({
	templateUrl: 'build/pages/sections/sections.html',
	providers: [GetData]
})

export class Sections {
	public sections: any;
    public testId;

	constructor(public getData: GetData, public nav: NavController, private navParams: NavParams) {
		this.load();
		this.nav = nav;
        this.testId = this.navParams.get('testId');
	}

	load() {
		this.getData.load()
		.then(data => {
		  this.sections = data;
		});
	}

    navigate(section) {
        this.nav.push(SectionsDetailPage, {testId: this.testId, section: section});
    }
}
