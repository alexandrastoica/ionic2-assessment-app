import {Component} from "@angular/core";
import {GetData} from "../../providers/get-data/get-data";
import {SectionsDetailPage} from "../sections-detail/sections-detail";
import {Page, NavController} from 'ionic-angular';


@Component({
	templateUrl: 'build/pages/sections/sections.html',
	providers: [GetData]
})

export class Sections {
	public sections: any;

	constructor(public getData: GetData, public nav: NavController) {
		this.load();
		this.nav = nav;
	}

	load() {
		this.getData.load()
		.then(data => {
		  this.sections = data;
		  console.log("sections " + this.sections);
		});
	}

    navigate(section) {
        this.nav.push(SectionsDetailPage, {section: section});
    }
}
