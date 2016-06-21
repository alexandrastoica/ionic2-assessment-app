import {Component, NgZone} from "@angular/core";
import {Platform} from 'ionic-angular';
import {DementiaService} from '../../services/dementia.service';
import {SectionsQuestionsPage} from "../sections-questions/sections-questions";

@Component({
  templateUrl: 'build/pages/tests/tests.html'
})
export class Tests {
   public answers = [];

  constructor(private dementiaService: DementiaService,
              private zone: NgZone,
              private platform: Platform) {

  }

   ionViewLoaded() {
        this.platform.ready().then(() => {
           // this.dementiaService.initDB();

            this.dementiaService.getAllData()
                .then(data => {
                    this.zone.run(() => {
                        this.answers = data;
                        console.log(" data is " + JSON.stringify(this.answers));
                    });
                })
                .catch(console.error.bind(console));
        });
    }
}
