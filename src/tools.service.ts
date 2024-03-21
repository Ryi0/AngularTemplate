import { Injectable } from '@angular/core';
import {Database} from "./app/data/database";
import {InterfaceObject} from "./app/data/i-object";
import {ObjectTypes} from "./app/data/object-types";
import {Engine} from "./app/data/engine";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  static Db = new Database([]);
  static getTypeOfObject = (obj:InterfaceObject): any => {
    return Object.getPrototypeOf(obj).constructor.name;
  }

  static IsEngine(obj:InterfaceObject):boolean {
    return ToolsService.getTypeOfObject(obj) == ObjectTypes.ElectricEngine || ToolsService.getTypeOfObject(obj) == ObjectTypes.GasEngine;
  }
  static GetRpm(obj: InterfaceObject) {
    if (ToolsService.IsEngine(obj)) {
      return (<Engine>obj).maxRpm
    } else {
      throw new Error("Not an engine")
    }
  }
  constructor() { }
}

