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
  static readonly Db = new Database([]);
  static readonly AttributeToolFactory = (name:string)=> new AttributeMethod(name);
  static readonly ToolKitList = new Array<ToolingTemplate>;
  constructor() {
  }
  static readonly getTypeOfObject = (obj: InterfaceObject): any => {

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


  private static getDbInfo(propName: string, List?:InterfaceObject[]):{
    //Region object return definition
    isPropPresentEverywhere: boolean;
    typesToInclude: string[];
    typesToExclude: string[]
    //End object definition
  } {
    let listToUse = List ?? this.Db.ObjList;
    let isPropPresent: boolean = false;
    const typesToInclude: string[] = [];
    const typesToExclude: string[] = []
    const presenceFlags: boolean[] = [];
    const dbInfo =
      {isPropPresentEverywhere:isPropPresent, typesToInclude:typesToInclude, typesToExclude:typesToExclude};
    listToUse.forEach((obj) => {
      const objProps = Object.keys(obj);
      isPropPresent = objProps.includes(propName);
      if(obj.type!=undefined) {
        function addToIncludedTypes() {
          if (typesToInclude.includes(<string>obj.type)){
            return
          }
          else typesToInclude.push(<string>obj.type)
        }
        function addToExcludedTypes() {
          if (typesToExclude.includes(<string>obj.type)){
            return
          }
          else typesToExclude.push(<string>obj.type)
        }
        isPropPresent ? addToIncludedTypes():addToExcludedTypes()
      } else console.warn(`No type for obj ${obj.name} ${obj}`);
      presenceFlags.push(isPropPresent);
    });
    console.log(`Included types : ${typesToInclude}`);
    console.log(`Excluded types : ${typesToExclude}`);
    if (presenceFlags.includes(false)) {
      isPropPresent = false;
      console.log(`The prop ${propName} is not present in all objects`);
    }
    return dbInfo;
  }


  /**
   * Retrieves an array of property values from the database objects based on the specified property name and optional input value.
   *
   * @param {string} propName - The name of the property.
   * @param {any|undefined} inputValue - (Optional) The input value used to filter the property values. Defaults to undefined.
   * @param {Array} [List] - (Optional) The list of objects to search for the property values. Defaults to the internal object list.
   */
  static GetArrayOfPropertyValues(propName:string , inputValue:string|undefined, List?:[]){
    console.log(this.getDbInfo(propName), List);
    const dbInfo = this.getDbInfo(propName);
    const typesWithProperty = dbInfo.typesToInclude;
    const typesWithoutProperty = dbInfo.typesToExclude;
    const propertyPresentNowhere = !dbInfo.isPropPresentEverywhere&&typesWithProperty.length<=0;
    let listToUse:InterfaceObject[] = [];
    const ObjectsAsArray:any[][][] = [];
    if (propertyPresentNowhere){
      console.warn("no objects with the property")
        return;
      }

    listToUse = (typesWithoutProperty.length<=0)? this.Db.ObjList:this.Db.ObjList.filter(obj =>{
      return typesWithProperty.includes(<string>obj.type);
    })

    listToUse.forEach(obj => ObjectsAsArray.push(Object.entries(obj))) // 0 is key 1 is value shoulda used map     const arrayOfValuesForPropname = this.Db.ObjList.map((obj:InterfaceObject) => {return Object.entries(obj)})
    console.log(ObjectsAsArray)
    const _dirtyArrayOfValuesForPropName: (false | string)[] = ObjectsAsArray.map((kvPairArray):false|string => {
      let value:string|undefined;
      kvPairArray.forEach(kvPair =>{
        const tmpVal = kvPair[1];
        if (kvPair[0] === propName) {
          if (inputValue===undefined||inputValue==tmpVal){
            //double equal to assure that number values in property is truthy compared but triple for undefined because "fake" undefined need to also work. ie : "Price":"undefined" could be a value.
            value = tmpVal;
          }
        }
      })
      console.log(value)
      if (value!==undefined){
        return value
      }
      else return false;
    })
    const isString = (value: any): value is string => typeof value === 'string';
    const arrayOfValuesForPropname: string[] = _dirtyArrayOfValuesForPropName.filter(isString);

    console.log(arrayOfValuesForPropname)
    return arrayOfValuesForPropname;
  }
  static CountByName(name:string){
    const tmpRet = this.GetArrayOfPropertyValues("name", name)?.length;
    if (tmpRet===undefined){
      return 0;
    }
    else return tmpRet;
  }

  static GroupCount(property:string){
    const rawPropList: undefined | any[] = this.GetArrayOfPropertyValues(property, undefined)
    if (rawPropList==undefined){
      return;
    }
    const countPerGroup = new Map<string, number>();
    const GroupsMap = new Map<string, any[]>();
    for (const value of rawPropList) {
      const mapField = GroupsMap.get(value);
      if (mapField===undefined){
        GroupsMap.set(value, [value])
      }
      else mapField.push(value);
      countPerGroup.set(value, mapField?.length===undefined?1:mapField.length);
      console.log(mapField)
    }
    console.log(rawPropList);
    console.log(GroupsMap)
    console.log(countPerGroup)
    return countPerGroup;
  }





}


