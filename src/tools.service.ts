import {Injectable} from '@angular/core';
import {Database} from "./app/data/database";
import {InterfaceObject} from "./app/data/i-object";
import {ObjectTypes} from "./app/data/object-types";
import {Engine} from "./app/data/engine";
import {ToolingTemplate} from "./app/tools/tool-dir/tooling-template";

class AttributeMethod extends ToolingTemplate {
  override toolName: string;

  /**
   * Not sure why I did it that way, maybe not totally usefully useless.
   * This array of maps is kinda tiresome. Could be cool if I want to easily store data or stats
   * to either of the attributes. But downside is, I feel like it's extra dumb therefore I can't work on it.
   */
  // override mainTool(): void {
  //   this.setAllAttributes();
  //   for (const Attribute of this.ListOfAttributes) {
  //     // console.log(this.getLastAttributeIndex(Attribute))
  //     this.attribKVPairArray.push(new Map([[Attribute, this.getLastAttributeIndex(Attribute)]]))
  //     this.attribKVPairArray[0].set(Attribute, this.getLastAttributeIndex(Attribute));
  //     this.addToAttributesCount(Attribute)
  //   }
  //   console.log(this.attribKVPairArray);
  //   // this.calculateRealCount(this.attribKVPairArray)
  // }
  override mainTool(): void {
    this.setAllAttributes();
    for (const Attribute of this.ListOfAttributes) {
      // console.log(this.getLastAttributeIndex(Attribute))
      this.attributeCountMap.set(Attribute, this.getLastAttributeIndex(Attribute));
      this.addToAttributesCount(Attribute)
    }
    this.calculateRealCount(this.attributeCountMap)
    // console.log(this.calculateRealCount(this.attributeCountMap));
    console.log(this.attributeCountMap);
  }
  public AllAssignedAttributes;
  public ListOfAttributes = new Array<string>();
  attribKVPairArray = new Array<Map<string, number>>
  attributeCountMap = new Map<string, number>;

  private calculateRealCount(KVAttributesMap: Map<string, number>) {
    const attrMap = KVAttributesMap;
    for (const key of attrMap.keys()) {
      attrMap.set(key, attrMap.get(key)!+1 );
    }
    const arrayFromMap = Array.from(attrMap);
    for (let i = 0; i < arrayFromMap.length; i++) {
      try {
        const nextEntry = arrayFromMap[i+1][1];
        if (nextEntry!=undefined) {
          arrayFromMap[i][1] = arrayFromMap[i][1] - arrayFromMap[i+1][1];
          // console.log(arrayFromMap[i ][1] - arrayFromMap[i+1][1])
          console.log(arrayFromMap[i])
        }
      }
      catch (e){
        console.log("There is no item past this. Could/should probably add a checker for the index to see if it is over the length"+e)
      }
    }
    // for (let i = 0; i < attrMap.size; i++) {
    //   attrMap.entries()
    // }
    const mapReturn = new Map( arrayFromMap);
    console.log(mapReturn);
    this.attributeCountMap = mapReturn;
  }
  private setAllAttributes(){
    for (const assignedAttribute of this.AllAssignedAttributes) {
      this.ListOfAttributes.find(attr => attr===assignedAttribute)===undefined?this.ListOfAttributes.push(assignedAttribute):true;
    }
    // console.log(this.ListOfAttributes)
  }
  private addToAttributesCount(attribute:string){
    const attrMap = this.attribKVPairArray.find(value => value.get(attribute));
    if (attrMap!=undefined){
      attrMap.set(attribute, attrMap.get(attribute)!+1);
    }
  }

  private getLastAttributeIndex(attribute:string){
    const sortedList = this.AllAssignedAttributes.sort();
    // console.log(sortedList);
    let count = 0;
    for (let i = 0; i < this.AllAssignedAttributes.length; i++) {
      if (sortedList[i]===attribute){
        // console.log(sortedList[i]);
        // console.log(sortedList[i+1]);
        if (sortedList[i+1]!==attribute){
          count = i;
          break;
        }
      }
    }
    return count;
  }

  /**
   * Get all the different attributes and assign them to an array
   */
  private GetAllAssignedStringAttributes() {
    return this.CachedData.reduce((acc: string[], value) => {
      if (typeof value.attribute === "string") {
        acc.push(value.attribute);
      }
      return acc;
    }, []);
  }
  constructor(name: string) {
    super();
    this.toolName = name;
    this.AllAssignedAttributes = this.GetAllAssignedStringAttributes();
  }
}



@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  static Db = new Database([]);
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

  constructor() {
  }
  static AttributeToolFactory = (name:string)=> new AttributeMethod(name);
  static ToolKitList = new Array<ToolingTemplate>;

}


