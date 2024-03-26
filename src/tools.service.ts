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


