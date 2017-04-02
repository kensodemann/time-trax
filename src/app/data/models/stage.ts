export class Stage {
  _id: string;
  stageNumber: number;
  name: string;

  constructor(obj?: any) {
    if (obj) {
      this._id = obj._id;
      this.stageNumber = obj.stageNumber;
      this.name = obj.name;
    }
  }
}
