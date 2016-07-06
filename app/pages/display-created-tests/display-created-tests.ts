import {Component} from '@angular/core';
import {Modal, NavController} from 'ionic-angular';
import {DementiaSqlightService, CreateTest} from '../../services/dementiasqlight.service';
import {Tests} from '../tests/tests';
/*
  Generated class for the DisplayCreatedTestsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/display-created-tests/display-created-tests.html',
})
export class DisplayCreatedTestsPage {
  createdTests: CreateTest[];

  constructor(public nav: NavController, public dementiaSqlService: DementiaSqlightService) {}

  ionViewLoaded() {
       // this.platform.ready().then(() => {
           this.createdTests = [];
            this.dementiaSqlService.getCreatedTests()
            .then(
              data => {
                this.createdTests = [];
                if (data.res.rows.length > 0) {
                  for (var i = 0; i < data.res.rows.length; i++) {
                    let item = data.res.rows.item(i);
                    this.createdTests.push(new CreateTest(item.id, item.name, item.date));
                  }
                }
            });
      //  });
    }

   showDetail(id) {
        let modal = Modal.create(Tests, {
            id: id
        });
        this.nav.present(modal);

        modal.onDismiss(() => {
        });
    }

}
