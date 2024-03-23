import {InterfaceObject} from "./i-object";
import {ObjectTypes} from "./object-types";
import {Engine} from "./engine";
import {ToolsService} from "../../tools.service";

abstract class furniture implements InterfaceObject{
    id: number;

    name: string;
    attribute: any;
    BurnFurniture(){
      console.log(`Furniture: ${this.id} Is not burnt`);
    }
    protected constructor(id: number, name: string, attribute: any) {
      this.id = id;
      this.name = name;
      this.attribute = attribute;
    }

}



class ElectricEngine extends Engine{

  constructor(id: number, name: string, attribute: any, maxRpm:number) {
    super(id, name, attribute, maxRpm);
  }
}

class GasEngine extends Engine{
  constructor(id: number, name: string, attribute: any, maxRpm:number) {
    super(id, name, attribute, maxRpm);
  }
}

class Chair extends furniture {
      constructor(id: number, name: string, attribute: any){
        super(id, name, attribute);
    }
}

class Table extends furniture {
    constructor(id: number, name: string, attribute: any){
        super(id, name, attribute);
    }
}


export class ObjectFactory {
    static id:number = 0;

    public static createObject(type:ObjectTypes, name: string, attribute: any) {
      let createdObject = (()=>{
      ObjectFactory.id++;
      if (type === 'Chair') {
        return new Chair(ObjectFactory.id, name, attribute);
      }
      if (type === 'Table') {
        return new Table(ObjectFactory.id, name, attribute);
      }
      if (type === 'ElectricEngine') {
        return new ElectricEngine(ObjectFactory.id, name, attribute, 0)
      }
      if (type === 'GasEngine') {
        return new GasEngine(ObjectFactory.id, name, attribute, 0)
      }
      else {
        ObjectFactory.id--;
        throw new Error('Invalid type');
      }
      })
      // const ReturnObject = createdObject();
      const ReturnObject = this.setType(createdObject());

      console.log(ReturnObject)
      return ReturnObject;
    }

    public static setType(obj:InterfaceObject){
     const o = obj;
      o.type = ToolsService.getTypeOfObject(obj);
      return o;
    }

    public static setRpm(engine:InterfaceObject, maxRpm: number) {
      if (!(engine instanceof Engine)) {
        throw new Error(`${engine}: is not a valid engine`);
      }
      else {
        engine.maxRpm = maxRpm;
      }
    }
}

