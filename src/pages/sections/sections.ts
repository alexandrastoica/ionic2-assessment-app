import { Component } from "@angular/core";
import { GetData } from "../../providers/get-data/get-data";
import { SectionsDetailPage } from "../sections-detail/sections-detail";
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";

@Component({
	templateUrl: 'sections.html'
})

export class Sections {
	public sections: any;
    public testId;

	constructor(public getData: GetData, public nav: NavController, private navParams: NavParams){
		this.nav = nav;
        this.testId = this.navParams.get('testId');
	}

	ionViewDidLoad() {
		this.getData.load().then(data => {
		  this.sections = data;
		});
	}

    navigate(section) {
        this.nav.push(SectionsDetailPage, {testId: this.testId, section: section});
    }
}
