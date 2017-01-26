import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class DateService {

  weekEndDate(dt: any) {
    const endDt = moment(dt);
    const offset = (endDt.isoWeekday() === 7 ? 7 : 0);
    return endDt.isoWeekday(6 + offset).format('YYYY-MM-DD');
  }

}
