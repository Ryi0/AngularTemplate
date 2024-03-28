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


  private static dbHasProperty(propName: string, List?:InterfaceObject[]):{
    //Region object return definition
    isPropPresentEverywhere: boolean;
    typesToInclude: string[];
    typesToExclude: string[]
    //End object definition
  } {
    let listToUSe = List !=undefined? List:this.Db.ObjList;
    let isPropPresent: boolean = false;
    const typesToInclude: string[] = [];
    const typesToExclude: string[] = []
    const presenceFlags: boolean[] = [];
    const objectAnswer = {isPropPresentEverywhere:isPropPresent, typesToInclude:typesToInclude, typesToExclude:typesToExclude};

    listToUSe.forEach((obj) => {
      const objProps = Object.keys(obj);
      isPropPresent = objProps.includes(propName);
      if(obj.type!=undefined) {
        isPropPresent ? !typesToInclude.includes(obj.type) ? typesToInclude.push(obj.type) : null :!typesToExclude.includes(obj.type) ? typesToExclude.push(obj.type):null
      } else console.warn(`No type for obj ${obj.name} ${obj}`);
      presenceFlags.push(isPropPresent);
    });
    console.log(`Included types : ${typesToInclude}`);
    console.log(`Excluded types : ${typesToExclude}`);
    if (presenceFlags.includes(false)) {
      isPropPresent = false;
      console.log(`The prop ${propName} is not present in all objects`);
    }
    return objectAnswer;
    // return [objectAnswer.ispropPresent, objectAnswer.typesToInclude, objectAnswer.typesToExclude ];
  }


  /**
   * Retrieves an array of property values from the database objects based on the specified property name and optional input value.
   *
   * @param {string} propName - The name of the property.
   * @param {any|undefined} inputValue - (Optional) The input value used to filter the property values. Defaults to undefined.
   * @param {Array} [List] - (Optional) The list of objects to search for the property values. Defaults to the internal object list.
   */
  static GetArrayOfProperty(propName:string , inputValue:any|undefined, List?:[]){
    console.log(this.dbHasProperty(propName));
    const dbInfo = this.dbHasProperty(propName);
    const typesWithProperty = dbInfo.typesToInclude;
    const typesWithoutProperty = dbInfo.typesToExclude;
    let listToUse = [];
    if (!dbInfo.isPropPresentEverywhere&&typesWithProperty.length<=0){
        return;
      }

    listToUse = (typesWithoutProperty.length<=0)? this.Db.ObjList:this.Db.ObjList.filter(obj =>{
      return typesWithProperty.includes(<string>obj.type);
    })
    const KvPairList:any[][][] = [];

    listToUse.forEach(obj => KvPairList.push(Object.entries(obj))) // 0 is key 1 is value shoulda used map     const arrayOfValuesForPropname = this.Db.ObjList.map((obj:InterfaceObject) => {return Object.entries(obj)})
    console.log(KvPairList)
    const arrayOfValuesForPropname: any[] = KvPairList.map((kvPairAsArray) => {
      let value;
      kvPairAsArray.forEach(pair =>{
        const tmpVal = pair[1];
        if (pair[0] === propName) {
          if (inputValue===undefined){
            value = tmpVal;
          }
          else if (tmpVal === inputValue) {
            value = tmpVal;
          }
        }
      })
      console.log(value)
      if (value!=undefined){
        return value
      }
      else return false;
    }).filter((prop: any) => prop);

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

  static GroupCount(property:string){
    const rawPropList: undefined | any[] = this.GetArrayOfProperty(property, undefined)
    if (rawPropList==undefined){
      return;
    }
    const countPerGroup = new Map<string, number>();
    const GroupsMap = new Map<string, any[]>();
    for (const prop of rawPropList) {
      const mapField = GroupsMap.get(prop);
      if (mapField===undefined){
        GroupsMap.set(prop, [prop])
      }
      else mapField.push(prop);
      countPerGroup.set(prop, mapField?.length===undefined?1:mapField.length);
    }
    console.log(rawPropList);
    console.log(GroupsMap)
    console.log(countPerGroup)
    return countPerGroup;

  }



}


