import {Injectable} from '@angular/core';
import {Database} from "./app/data/database";
import {InterfaceObject} from "./app/data/i-object";
import {ObjectTypes} from "./app/data/object-types";
import {Engine} from "./app/data/engine";
import {ToolingTemplate} from "./app/tools/tool-dir/tooling-template";

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

  constructor() {
  }
}

class AttributeMethod extends ToolingTemplate {
  override toolName: string;

  /**
   * Not sure why I did it that way, maybe not totally usefully useless
   */
  override mainTool(): void {
    for (const Attribute of this.ListOfAttributes) {
      for (const AssignedAttributes in this.AllAssignedAttributes) {
        if (Attribute === AssignedAttributes) {
        } else this.ListOfAttributes.push(AssignedAttributes);
      }
    }
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


  constructor(name: string) {
    super();
    this.toolName = name;
    this.AllAssignedAttributes = this.GetAllAssignedStringAttributes()
  }


}
