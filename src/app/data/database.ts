import {InterfaceObject} from "./i-object";

export class Database {
  get ObjList(): Array<InterfaceObject> {
    return this._ObjList;
  }

  set ObjList(value: Array<InterfaceObject>) {
    this._ObjList = value;
  }
  private _ObjList: Array<InterfaceObject> = [];
  public constructor(objList: Array<InterfaceObject>) {
    this.ObjList = objList;
  }
  public add(object: InterfaceObject) {
    this._ObjList.push(object);
  }
  public remove(object: InterfaceObject) {
      const index = this._ObjList.indexOf(object);
      if (index > -1) {
          this._ObjList.splice(index, 1);
      }
  }
  public isObjectValid(object: InterfaceObject) {
    const flags: boolean[] = new Array<boolean>;
    let acumulator:number = 0;

    for (const field of Object.values(object)) {
      field === undefined? flags[acumulator]=true: field === null?flags[acumulator]= true:flags[acumulator]=false;
      acumulator++;
    }
    return flags.every(flag => !flag);
  }
  public addSafe(object: InterfaceObject) {
    if (this.isObjectValid(object)) {
      this.add(object);
    }
  }
}
