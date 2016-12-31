import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class DateService {

  weekEndDate(dt: any) {
    let endDt = moment(dt);
    let offset = (endDt.isoWeekday() === 7 ? 7 : 0);
    return endDt.isoWeekday(6 + offset).format('YYYY-MM-DD');
  }

}
