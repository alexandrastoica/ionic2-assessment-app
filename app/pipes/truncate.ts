import {Pipe} from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class Truncate {
  transform(value: string, args) {
       let limit = parseInt(args);
      return value.length > limit ? value.substring(0, args) + '...' : value;
    }

}
