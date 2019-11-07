import { Injectable } from '@angular/core';
import { ToolBarComponent } from '../../app/modules/tool-bar/tool-bar.component';
import { DatePipe } from '@angular/common';
import { FormDatabaseService } from '../services/form-database.service';
import { CookieService } from './cookie.service';
import { ElementDatabaseService } from './element-database.service';
import { FormDataServiceService } from './form-data-service.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
  

  
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
  isConfigureModalActive: boolean;
  workspaceTitle = "FlowCatalyst"
  workspaceTitleFull="FlowCatalyst"
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

  comboboxComponents=[];

  isNewModalActive: boolean = false;
  isOpenModalActive: boolean = false;
  isExportModalActive: boolean = false;
  isSettingsModalActive: boolean = false;
  isDeleteFormModalActive: boolean = false;
  isPropertiesModalActive: boolean = false;
  constructor(

    public datePipe: DatePipe,
    public elementDataBase: ElementDatabaseService,
    ) {
}
  
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
  closeNewFormModal() {
    this.isNewModalActive = false;
  }

  toggleDeleteFormModal() {
    this.isDeleteFormModalActive = false;
  }

  closeOpenFormModal() {
    this.isOpenModalActive = false;
  }

  closeDeleteFormModal() {
    this.isDeleteFormModalActive = false;
  }

  toggleNewFormModal() {
    this.isNewModalActive = !this.isNewModalActive;
  }

  toggleOpenFormModal() {
    this.isOpenModalActive = !this.isOpenModalActive;
  }

  toggleExportFormModal() {
    this.isExportModalActive = !this.isExportModalActive;
  }

  toggleSettingsModal() {
    this.isSettingsModalActive = !this.isSettingsModalActive;
  }
  togglePropertiesModal(){ 
    this.isPropertiesModalActive = !this.isPropertiesModalActive;
    console.log(this.isPropertiesModalActive);
  }
  closePropertiesModal(){
    this.isPropertiesModalActive= false;
  }
  toggleConfigureModal(){
    this.isConfigureModalActive=!this.isConfigureModalActive
  }
  closeConfigureModal(){
    this.isConfigureModalActive= false;
  }
 
  
   /**
   * called after creating or opening a form.
   * 
   */ 
  initializeWorkspace() {
    var newDate = new Date();
    if (this.isComponentsLoaded == false) {
        this.getElements();
        this.isComponentsLoaded = true;
    } 
    this.closeNewFormModal();
    this.formTitle = "";
    this.lockerVisible = false;
    this.lastSavedVisible = true;
    this.lastSaved = "Saved. (Today "+ this.datePipe.transform(newDate, 'HH:mm') +")";
    
    this.refreshHierarchy();
    //this.componentsVisible = true;
  }
  refreshHierarchy() {
    this.hierarchyItems = [];
    for (this.i = 0; this.i < this.board.length; this.i++) {
      this.hierarchyItems.push(
        { title : this.board[this.i]['title'], id : this.board[this.i]['id'], default : this.board[this.i]['default'] }
      )
    }
    console.log("Hierarchy ",this.hierarchyItems);
    
  }
  

 
  getElements(): void {
    this.components = this.elementDataBase.getElements();
    console.log( this.components)

  }

}
