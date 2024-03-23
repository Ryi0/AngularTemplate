import {ToolsService} from "../../tools.service";
import {ObjectTypes} from "./object-types";

export interface InterfaceObject {
  id:number;
  name:string;
  attribute:any;
  type?:string;
}
