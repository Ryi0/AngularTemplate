import {Injectable} from '@angular/core';
import {Database} from "./app/data/database";
import {InterfaceObject} from "./app/data/i-object";
import {ObjectTypes} from "./app/data/object-types";
import {Engine} from "./app/data/engine";
import {ToolingTemplate} from "./app/tools/tool-dir/tooling-template";

class AttributeMethod extends ToolingTemplate {
  override toolName: string;

  /**
   * Not sure why I did it that way, maybe not totally usefully useless
   */
  override mainTool(): void {
    //This won't run because the list is empty so it dont go in the for loop
    /*TODO:[please for the love of everything that is good, don't leave it like this. It's inhumane]*/
    // this.ListOfAttributes=["Lithium"]
    const tmpTestAttr = [];
    this.setAllAttributes();
    const lastIndexArray = []
    // console.log( this.countAttribute("Lithium"));
    // for (const Attribute of this.ListOfAttributes) {
    //   for (const AssignedAttributes of this.AllAssignedAttributes) {
    //     console.log(`OVER if (${Attribute} === ${AssignedAttributes})`);
    //     if (Attribute === AssignedAttributes) {
    //       console.log(`inside if (${Attribute} === ${AssignedAttributes})`);
    //       this.addToAttributesCount(Attribute);
    //     } else {
    //       this.attribKVPairArray.push(new Map([[AssignedAttributes, 0]]))
    //       tmpTestAttr.push(AssignedAttributes);
    //     }
    //   }
    // }
    for (const Attribute of this.ListOfAttributes) {
      // console.log(this.countAttribute(Attribute))
      this.attribKVPairArray.push(new Map([[Attribute, this.countAttribute(Attribute)]]))
      // for (let i = 0; i < this.attribKVPairArray.length; i++) {
      //   console.log(this.attribKVPairArray[i].get(Attribute));
      // }
      this.addToAttributesCount(Attribute)
    }
    console.log(this.attribKVPairArray);

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
  public AllAssignedAttributes;
  public ListOfAttributes = new Array<string>();
  attribKVPairArray = new Array<Map<string, number>>

  private setAllAttributes(){
    for (const assignedAttribute of this.AllAssignedAttributes) {
      this.ListOfAttributes.find(attr => attr===assignedAttribute)===undefined?this.ListOfAttributes.push(assignedAttribute):true;
    }
    console.log(this.ListOfAttributes)
  }
  private addToAttributesCount(attribute:string){
    const attrMap = this.attribKVPairArray.find(value => value.get(attribute));
    if (attrMap!=undefined){
      attrMap.set(attribute, attrMap.get(attribute)!+1);
    }
  }

  private countAttribute(attribute:string){
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


