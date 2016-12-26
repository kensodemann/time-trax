import * as moment from 'moment';

export interface Version {
  client: string;
  server: string;
  releaseDate: moment.Moment;
}
