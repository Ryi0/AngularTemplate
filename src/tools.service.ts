import { Injectable } from '@angular/core';
import {Database} from "./app/data/database";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  static Db = new Database([]);

  constructor() { }
}

