import {Injectable} from '@angular/core';
import {Database} from "./app/data/database";
import {InterfaceObject} from "./app/data/i-object";
import {Engine} from "./app/data/engine";
import {ToolingTemplate} from "./app/tools/tool-dir/tooling-template";
import {AttributeMethod} from "./app/toolsClasses/attribute-method";





@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  static Db = new Database([]);
  static AttributeToolFactory = (name:string)=> new AttributeMethod(name);
  static ToolKitList = new Array<ToolingTemplate>;
  constructor() {
  }
  static getTypeOfObject = (obj: InterfaceObject): any => {

    return Object.getPrototypeOf(obj).constructor.name;
  }

  static IsEngine(obj: InterfaceObject): boolean {
    return obj instanceof Engine;
  }

  static GetRpm(obj: InterfaceObject) {
    if (ToolsService.IsEngine(obj)) {
      return (<Engine>obj).maxRpm
    } else {
      throw new Error("Not an engine")
    }
  }

  static GetAllEnginesId() {
    const engines = new Array<Engine>;

  }

  static ToolFinder(name:string){
    return this.ToolKitList.find(tool =>tool.toolName===name);

  }
  static GetAllPropertiesFromDb (){
    const keys:string[] = []
    this.Db.ObjList.forEach((obj:InterfaceObject) => {

    })
    return keys;
  }


  private static hasProperty(propName: string) {
    let isPropPresent: boolean = false;
    const presenceFlags: boolean[] = []
    this.Db.ObjList.forEach((obj) => {
      const objProps = Object.keys(obj);
      isPropPresent = objProps.includes(propName);
      presenceFlags.push(isPropPresent);
      // console.log(`'propPresent ? ${isPropPresent}`)
    });
    if (presenceFlags.includes(false)) {
      console.log(`The prop ${propName} is not present in all objects`);
      return false;
    } else return true;
  }

  static GetArrayOfProperty(propName:string , inputValue:any){
    console.log(this.hasProperty(propName))
    if (!this.hasProperty(propName)){
      return;
    }

    const KvPairList:any[][][] = [];
    this.Db.ObjList.forEach(obj => KvPairList.push(Object.entries(obj))) // 0 is key 1 is value shoulda used map     const arrayOfValuesForPropname = this.Db.ObjList.map((obj:InterfaceObject) => {return Object.entries(obj)})
    console.log(KvPairList)
    const arrayOfValuesForPropname = KvPairList.map((kvPairAsArray) => {
      let value;
      kvPairAsArray.forEach(pair =>{
        if (pair[0] === propName) {
          if (inputValue===undefined){
            value = pair[1];
          }
          else if (pair[1] === inputValue) {
            value = pair[1];
          }
        }
      })
      console.log(value)
      if (value!=undefined){
        return value
      }
      else return false;
    }).filter(prop => prop);

    console.log(arrayOfValuesForPropname)
    return arrayOfValuesForPropname;
    // const arrayOfValuesForPropname = this.Db.ObjList.map((obj:InterfaceObject) => {})
  }
  static CountByName(name:string){
    const tmpRet = this.GetArrayOfProperty("name", name)?.length;
    if (tmpRet===undefined){
      return 0;
    }
    else return tmpRet;
  }





}


