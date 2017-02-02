import { Component } from "@angular/core";
import { Data } from "../../providers/data";
import { SQLiteService, CreateTest, Test } from '../../providers/sqlite';
import { SectionsDetailPage } from "../sections-detail/sections-detail";
import { NavController, NavParams } from 'ionic-angular';

@Component({
	templateUrl: 'sections.html'
})
export class Sections {
	public sections: any;
  public testId: number;
	public count: any;
	public total: number;

	constructor(public getData: Data, public nav: NavController, private navParams: NavParams, public sqlite: SQLiteService){
		this.nav = nav;
    this.testId = this.navParams.get('testId');
	}

	ionViewDidLoad() {
		this.sections = [];
		//run this at every page load to update the completed flag
		this.getData.load().then((data) => {
			//loop through each data object
			for(let item of data){
				//query database and get the number of results by section id and test id
				this.sqlite.getResultsBySectionTest(item.id, this.testId).then(_data => {
					for (var i = 0; i < _data.rows.length; i++) {
						this.count = _data.rows.item(i).count; //store the number of results per question
					} //for
					this.total = item.questions.length; //get the total number of questions per section
					//if they equal, then set completed as true else as false
					if(this.total == this.count){
						item.completed = true;
					} else {
						item.completed = false;
					} //if
					//store processed data into sections
					this.sections = data;
				});//sqlite
			}//for
		});//data

	}

  navigate(section) {
      this.nav.push(SectionsDetailPage, {testId: this.testId, section: section});
  }
}
