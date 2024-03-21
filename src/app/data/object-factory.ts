import {InterfaceObject} from "./i-object";
import {ObjectTypes} from "./object-types";

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

abstract class Engine implements InterfaceObject{
    id: number;
    name: string;
    attribute: any;
    private maxRpm:number;
    protected constructor(id: number, name: string, attribute: any, maxRpm:number) {
      this.id = id;
      this.name = name;
      this.attribute = attribute;
      this.maxRpm = maxRpm;
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
    static id:number = 0
    static createObject(type:ObjectTypes, name: string, attribute: any) {
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
    }
}
