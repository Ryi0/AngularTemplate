import {InterfaceObject} from "../../data/i-object";
import {ToolsService} from "../../../tools.service";

export abstract class ToolingTemplate {
  abstract toolName: string;
  abstract mainTool():void;
  private _isSelectionEmpty = ():boolean => ToolsService.Db.SelectedItems().length > 0;
  private _selection = ()=>{
    return this._isSelectionEmpty()?undefined:ToolsService.Db.SelectedItems();
  }
  public CachedData:InterfaceObject[] = new Array<InterfaceObject>();
  public Selection: InterfaceObject[] | undefined;
  private ImportCachedData(){
    this.CachedData = ToolsService.Db.ObjList;
    this.Selection = this._selection();
  }

  protected constructor() {
    this.ImportCachedData();
  }

}
