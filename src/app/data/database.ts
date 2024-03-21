import {InterfaceObject} from "./i-object";
import {computed, signal} from "@angular/core";
import {ObjectTypes} from "./object-types";

export class Database {

  get ObjList(): Array<InterfaceObject> {
    return this._ObjList;
  }

  set ObjList(value: Array<InterfaceObject>) {
    this._ObjList = value;
  }

  private _ObjList: Array<InterfaceObject> = [];
  ObjectCountSignal = signal(0);

  public constructor(objList: Array<InterfaceObject>) {
    this.ObjList = objList;
    this.ObjectCountSignal.set(this.ObjList.length);
  }

  /**
   * Make a try catch later wherever this is used to use different update method
   * @private
   */
  private updateObjectCountSignal() {
    if (this.ObjectCountSignal()>200){
      throw new Error("Unoptimized, change update method")
    }
    this.ObjectCountSignal.set(this.ObjList.length);
  }

  GetAllObjectTypes(){
    const types = [];
    for (const objectType of Object.values(ObjectTypes)) {
      types.push(objectType)
    }
    return types;
  }

  public add(object: InterfaceObject) {
    this._ObjList.push(object);
    this.updateObjectCountSignal();
  }



  public remove(object: InterfaceObject) {
    const index = this._ObjList.indexOf(object);
    if (index > -1) {
      this._ObjList.splice(index, 1);
    }
    this.updateObjectCountSignal();
  }

  public isObjectValid(object: InterfaceObject) {
    const flags: boolean[] = new Array<boolean>;
    let acumulator: number = 0;

    for (const field of Object.values(object)) {
      field === undefined ? flags[acumulator] = true : field === null ? flags[acumulator] = true : flags[acumulator] = false;
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
