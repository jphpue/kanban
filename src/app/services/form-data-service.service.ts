import { Injectable } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { PropertiesWindowComponent } from '../modules/properties-window/properties-window.component';
import { HierarchyComponent } from '../modules/hierarchy/hierarchy.component';
import { ItemComponent } from '../interfaces/item-component';
import { CookieService } from '../services/cookie.service';
import { FormDatabaseService } from './form-database.service';
import { DatePipe } from '@angular/common';
import { Comboboxitems } from '../interfaces/comboboxitems';


@Injectable({
  providedIn: 'root'
})
export class FormDataServiceService {

  constructor(
    public Cookies: CookieService, 
    public props: PropertiesWindowComponent,
    public hierarchy: HierarchyComponent,
    public datePipe: DatePipe,
    public dataservice: DataService,
    public formDataBase: FormDatabaseService,
 
  ) { }

  
  
 deleteItem(id:number){
    console.log("deleting id: "+id);
    this.dataservice.board = this.dataservice.board.filter(board=>board.id!==id);
    delete this.dataservice.idList[this.dataservice.board[id]];
    this.props.refreshProperties();
    this.hierarchy.refreshHierarchy();
    this.dataservice.defaultItems=[];
   
  }
  editItem(item: ItemComponent): void {

    item.editing = true;
  }
  closeForm(): void {
    this.Cookies.deleteCookie("form_id");
    this.destroyWorkspace();
  }

  /* delete currently active/open form */
  deleteActiveForm(): void {
    this.dataservice.formId = this.Cookies.getCookie("form_id");
    this.formDataBase.deleteForm(this.dataservice.formId).then((data:any) => {
      if(data)
      {
        this.destroyWorkspace();
        this.Cookies.deleteCookie("form_id");
        this.dataservice.closeDeleteFormModal();
      }
    });
  }


  /* for saving forms */
  saveForm(): void {
    this.dataservice.formId = this.Cookies.getCookie("form_id");
    this.dataservice.formData =  /*JSON.parse(*/JSON.stringify(this.dataservice.board/*)*/);
    if(this.dataservice.formId) {
      this.formDataBase.saveForm(this.dataservice.formId,this.dataservice.formData).then((data:any) => {
        if(data)
        {
          let newDate = new Date();
          console.log("Saved. at: " + this.datePipe.transform(newDate, 'HH:mm'));
          this.dataservice.lastSaved = "Saved. (Today "+ this.datePipe.transform(newDate, 'HH:mm') +")";
        }
      });
    }
  }

  /* loads form data (board contents) and updates current board contents */
  loadFormData(formId): void {
    this.formDataBase.loadFormData(formId).then((data:any) => {
      if(data)
      {
        let re = /\'/gi;
        this.dataservice.formData = data['data'][0]['templateData'].replace(re, '"');
        if(this.dataservice.formData !== 'empty')
        {
          this.dataservice.formData = JSON.parse(this.dataservice.formData);
          this.dataservice.board = this.dataservice.formData;
          console.log(this.dataservice.board);
          if(this.dataservice.board.length != 0)
          { 
            this.dataservice.id = this.dataservice.board[0]['id'];
            this.props.loadProperties(this.dataservice.id,null,null);
          } else {
            this.props.closeProperties();
          }
        } else {
          this.props.closeProperties();
          this.dataservice.board = [];
        }
        this.dataservice.refreshHierarchy();
      }
    });
  }
  /* for loading/opening form */
  loadForm(formId): void {
    this.formDataBase.loadForm(formId).then((data:any) => {
      if(data)
      {
        this.dataservice.formTitle = data['data']['title'];
        this.dataservice.workspaceTitle = data['data']['title'];
        this.Cookies.setCookie("form_id", this.dataservice.formId, 1, "/");
        this.loadFormData(formId);
        this.dataservice.initializeWorkspace();  
      }
    });
  }  
  /* open form */
  openForm(): void {
    this.formDataBase.loadForm(this.dataservice.openFormDropdown).then((data:any) => {
      console.log(data);
      if(data)
      {
        this.dataservice.formTitle = data['data']['title'];
        this.dataservice.workspaceTitle = data['data']['title'];
        this.Cookies.setCookie("form_id", this.dataservice.openFormDropdown, 1, "/");
        this.loadFormData(this.dataservice.openFormDropdown);
        this.dataservice.initializeWorkspace();
        this.dataservice.closeOpenFormModal();
        this.dataservice.refreshHierarchy();
      }
    });
  }


  
  /* for creating forms */
  createForm(): void {
    this.dataservice.formId = this.formDataBase.newForm(this.dataservice.formTitle).then((data:any) => {
    setTimeout(
      () => {
      if(this.dataservice.formId)
      {
        this.dataservice.formId = data['data']['_id'];
        this.dataservice.formTitle = data['data']['title'];
        this.dataservice.workspaceTitle = data['data']['title'];
        this.dataservice.board = [];
        /* setcookie to remember the form id */
        this.Cookies.setCookie("form_id", this.dataservice.formId, 1, "/");
        this.dataservice.initializeWorkspace();
      }
    });
    })
    , 2500}

  exportForm(): void {
    if(this.dataservice.exportFormat == 'json')
    {  
      this.dyanmicDownloadByHtmlTag({
        fileName: this.dataservice.workspaceTitle + '.json',
        text: JSON.stringify(this.dataservice.board)
      });
    }
    if(this.dataservice.exportFormat == 'xml')
    {  
      
    }
  }

   /* loads all forms */
   loadForms(): void {
    this.dataservice.selectFormTitles = [];
    this.formDataBase.loadtemplates().then((data:any) => {
      if(data)
      {
        for(let i=0; i<data['data'].length;i++){
          this.dataservice.selectFormTitles.push(
            {title: data['data'][i]['title'],id: data['data'][i]['_id']}
          )
        }
        this.dataservice.refreshHierarchy();
      }
    });
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.dataservice.setting.element.dynamicDownload) {
      this.dataservice.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.dataservice.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
  destroyWorkspace() {
    this.destroyElements();
    this.dataservice.closeDeleteFormModal();
    this.dataservice.lockerVisible = true;
    this.dataservice.lastSavedVisible = false;
    this.dataservice.workspaceTitle = "FlowCatalyst";
    this.dataservice.workspaceTitleFull = "FlowCatalyst";
    this.loadForms();
  }

  destroyElements(): void {
    this.dataservice.components.length = 0;
    this.dataservice.isComponentsLoaded = false;
  }

  addNewElement(component:object){
    
    this.checkForExistingId();
    if(this.dataservice.defaultExistingId.toString()=="NaN"){
      this.dataservice.defaultItemID=1;
    }
    else{
      this.dataservice.defaultItemID=this.dataservice.defaultExistingId
    }
    this.dataservice.defaultItemID++;
    console.log(Math.max(this.dataservice.component[0]['default']));
    const childElement=<Comboboxitems>{
      id: 'c'+ this.dataservice.defaultItemID.toString(),
      row: 3,
      prompt: "",
      parent: component[0]["id"],
      title: "title",
      itemId: this.dataservice.defaultItemID
    }
  
    this.dataservice.comboboxComponents.push(childElement);
 
    //console.log(component[0]["default"]);
    console.log(childElement)
    //this.loadGroup();
    console.log(this.dataservice.component[0]['default']);
    this.saveElements();
  }
  checkForExistingId(): any {

    if(Math.max(this.dataservice.component[0]['default']) == 0){
      this.dataservice.defaultExistingId=0;
    }

    else{
      this.dataservice.defaultExistingId = Math.max(this.dataservice.component[0]['default'][0]['itemId']);
    }
  
    //console.log(this.dataservice.component[0]['default'][0]['itemId']);
    console.log(this.dataservice.defaultExistingId)
  }

  saveElements(){
    this.dataservice.defaultItems= [];
    
   
    for(let obj of this.dataservice.comboboxComponents){
      
      if(obj['type']=='combobox'||obj['type']=='radiobutton')
        console.log(obj['id']);
 
          let value;
          if((<HTMLInputElement> document.getElementById(obj['id'])) == null){
            value = "PlaceHolder";
          }
          else{
            value=(<HTMLInputElement> document.getElementById(obj['id'])).value
          }
          
  
          console.log(value)
          this.dataservice.defaultItems.push(
            { 
              id: obj['id'],
              row: obj['row'],
              prompt : value,
              parent: obj['parent'],
              title:obj['title'],
              itemId: this.dataservice.defaultItemID
              }
          )
          this.dataservice.component[0]['default'] = this.dataservice.defaultItems;
          
             
    }
    
    console.log(this.dataservice.component)
    console.log(this.dataservice.defaultItems);
    //this.loadGroup();
  }

  deleteChildElement(id:number){
    console.log(id)
    console.log("deleting child element id: "+id);
    console.log(this.dataservice.component[0]['default'][id]);/*
    delete this.dataservice.idList[this.dataservice.board[id]];
    this.props.refreshProperties();
    this.hierarchy.refreshHierarchy();
    this.dataservice.defaultItems=[];*/
   
  }

 
  loadGroup(){
   
    let i;
    let element;
    console.log(this.dataservice.component)
    let length = this.dataservice.comboboxComponents.length
    this.dataservice.comboboxComponents = []
    for(let obj of this.dataservice.component[0]['default']){

      let key : string;
      console.log(obj)
      this.dataservice.comboboxComponents.push(obj);
      console.log(this.dataservice.comboboxComponents);
    }
  }

  openFieldData(){
    this.loadGroup();
    this.dataservice.toggleConfigureModal();
    
  }
}
