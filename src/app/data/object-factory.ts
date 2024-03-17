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
    static createObject(type:ObjectTypes, id: number, name: string, attribute: any){
        if(type === 'Chair'){
            return new Chair(id, name, attribute);
        } else if(type === 'Table'){
            return new Table(id, name, attribute);
        }
        throw new Error('Invalid type');
    }
}
