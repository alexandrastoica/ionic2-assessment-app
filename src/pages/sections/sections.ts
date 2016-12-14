import { Component } from "@angular/core";
import { Data } from "../../providers/data";
import { SectionsDetailPage } from "../sections-detail/sections-detail";
import { NavController, NavParams } from 'ionic-angular';

@Component({
	templateUrl: 'sections.html'
})
export class Sections {
	public sections: any;
  public testId;

	constructor(public getData: Data, public nav: NavController, private navParams: NavParams){
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
