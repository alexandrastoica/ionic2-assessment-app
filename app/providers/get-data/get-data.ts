import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetData {
  data: any = null;

  constructor(public http: Http) {}

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
    this.http.get('data/data.json')
      .map(res => res.json())
        .subscribe(data => {
          this.data = data.sections;
          resolve(this.data);
        });
    });
  }

  getBySectionId(passedId: number) {
   let id = (Math.floor(passedId)-1);
   console.log(id);
    return new Promise(resolve => {
    this.http.get('data/data.json')
      .map(res => res.json())
        .subscribe(data => {
          this.data = data.sections;
          resolve(this.data[id]);
        });
    });
  }
}

