import {InterfaceObject} from "./i-object";
import {computed, signal, WritableSignal} from "@angular/core";
import {ObjectTypes} from "./object-types";
import {ObjectFactory} from "./object-factory";
import {ToolsService} from "../../tools.service";
import {Engine} from "./engine";

export class Database {

  get ObjList(): Array<InterfaceObject> {
    return this._ObjList;
  }

  set ObjList(value: Array<InterfaceObject>) {
    this._ObjList = value;
  }
  public displayData:InterfaceObject[] = [];
  public serverData: any[] | any;
  private _ObjList: Array<InterfaceObject> = [];
  ObjectCountSignal = signal(0);
  public SelectedItems: WritableSignal<InterfaceObject[]> = signal(new Array<InterfaceObject>());
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
    // console.log("GOGOASD")
    this._ObjList.push(object);
    this.updateObjectCountSignal();
    console.log(this._ObjList)
  }
  public parseServerData(){
    const parsedData: InterfaceObject[] = [];
    this.serverData.forEach((value:object) =>{
      let tmpVal = <InterfaceObject>value;
      const type = tmpVal.type
      if (type!=undefined){
       const typedObj = ObjectFactory.createObject(ObjectTypes[<ObjectTypes>type], tmpVal.name, tmpVal.attribute);
        if (ToolsService.IsEngine(typedObj)) {
          const tmpEng = <Engine>value;
          console.log(this.GetMaxRpm(tmpVal));
          ObjectFactory.setRpm(typedObj, this.GetMaxRpm(tmpVal));
        }
        // console.log((<Engine>typedObj).maxRpm)
        parsedData.push( typedObj);
      }

      // console.log((<Engine>value).maxRpm)
    })
    this.displayData = parsedData;
    console.log(this.displayData)
  }
  public GetMaxRpm(engine:InterfaceObject){
    let rpm= Object.entries(engine).find(value => value[0]==="_maxRpm");
    if(rpm!=undefined){
      return <number>rpm[1]
    }
    return 0;
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
