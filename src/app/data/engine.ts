import {InterfaceObject} from "./i-object";

export abstract class Engine implements InterfaceObject{
  get maxRpm(): number {
    return this._maxRpm;
  }

  set maxRpm(value: number) {
    if (value<=0){
      throw new Error("Max RPM is less than 0");
    }
    this._maxRpm = value;
  }
  id: number;
  name: string;
  attribute: any;
  private _maxRpm:number;
  protected constructor(id: number, name: string, attribute: any, maxRpm:number) {
    this.id = id;
    this.name = name;
    this.attribute = attribute;
    this._maxRpm = maxRpm;
  }

}
