export class Timesheet {
  _id: string;
  endDate: string;
  userRid: string;

  constructor(obj?: any) {
    if (obj) {
      this._id = obj._id;
      this.endDate = obj.endDate;
      this.userRid = obj.userRid;
    }
  }
}
