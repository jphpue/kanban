import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  board = [];
  components: object[];
  isComponentsLoaded: boolean = false;
  component: object;
  componentTitle: string = '';
  properties: object[];
  activeProperty: string;
  hierarchyItems: [];
  todo: string[];
  template = "Template";
  boardMain = "Board";
  componentsTitle = "Components";
  itemPrompt: string;
  idForBoard: number;
  i: number;
  id: number;
  idList = [];

  workspaceTitle = "FlowCatalyst"
  formTitle: string;
  formId: any;
  formData: object[];
  lockerVisible: boolean = true;
  lastSavedVisible: boolean = false;
  lastSaved: string;
  selectFormTitles = [];
  openFormDropdown: string;
  exportFormat: string;
  autoSaveInterval: number = 30000;
  autoSaveIntervalDraft: number = 30;
  autoSave: string = 'true';
  //componentsVisible: boolean = false;

  isNewModalActive: boolean = false;
  isOpenModalActive: boolean = false;
  isExportModalActive: boolean = false;
  isSettingsModalActive: boolean = false;
  isDeleteFormModalActive: boolean = false;
  isPropertiesModalActive: boolean = false;
  constructor() { }
  
  test() {
    console.log(this.components);
  }
  
  checkId(clone: any): void {
    if (this.idList.includes(clone['id'])) {
      clone['id'] = Math.floor(Math.random() * Math.floor(2000));


    }
    if (this.idList.includes(clone['id']))
      this.checkId(clone);

      this.idList.push(clone['id']);


  }



}
