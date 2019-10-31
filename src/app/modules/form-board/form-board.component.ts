import { Component, OnInit, Output,EventEmitter, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ItemComponent } from '../../interfaces/item-component';
import { FormComponent } from '../../interfaces/form-component';
import { ElementDatabaseService } from '../../services/element-database.service';
import { DataService } from '../../services/data-service.service';
import { FormDatabaseService } from '../../services/form-database.service';
import { CookieService } from '../../services/cookie.service'
//import { MainViewComponent } from '../../pages/main-view/main-view.component';
import { PropertiesWindowComponent } from '../../modules/properties-window/properties-window.component';
import { HierarchyComponent } from '../../modules/hierarchy/hierarchy.component';
import { cloneDeep } from 'lodash';
import { emit } from 'cluster';

@Component({
  selector: 'app-form-board',
  templateUrl: './form-board.component.html',
  styleUrls: ['./form-board.component.scss'],
  providers: [DatePipe]
})
@Injectable({
  providedIn: 'root'
})
export class FormBoardComponent implements OnInit {

  constructor(
    public Cookies: CookieService,
    private elementDataBase: ElementDatabaseService,
    private props: PropertiesWindowComponent,
    
    public dataservice: DataService,
    public hierarchy:HierarchyComponent,

    private formDataBase: FormDatabaseService
    
  ) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      console.log("changing arrays")
      console.log(event.previousContainer.data);
  
      const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
      var newId = Math.floor(Math.random() * Math.floor(20000));
      clone['id'] = newId;
      //this.checkId(clone);
     
      console.log(newId);
      setTimeout(
        () => {
          this.props.loadProperties(newId, event);
        }, 50)
    // Add the clone to the new array.
      event.container.data.splice(event.currentIndex, 0, clone);
    
    }
    //this.loadProperties(id:number, item: event);
    this.hierarchy.refreshHierarchy();
  
  }

  dropHierarchy(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  refreshHierarchy() {
    this.dataservice.hierarchyItems = [];
    for (this.dataservice.i = 0; this.dataservice.i < this.dataservice.board.length; this.dataservice.i++) {
      this.dataservice.hierarchyItems.push(
        { title : this.dataservice.board[this.dataservice.i]['title'], id : this.dataservice.board[this.dataservice.i]['id'], default : this.dataservice.board[this.dataservice.i]['default'] }
      )
    }
    console.log("Hierarchy ",this.dataservice.hierarchyItems);
    
  }
  
  deleteItem(id:number){
    console.log("deleting id: "+id);
    this.dataservice.board = this.dataservice.board.filter(board=>board.id!==id);
    delete this.dataservice.idList[this.dataservice.board[id]];
   
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
    this.formId = this.Cookies.getCookie("form_id");
    this.formDataBase.deleteForm(this.formId).then((data:any) => {
      if(data)
      {
        this.destroyWorkspace();
        this.Cookies.deleteCookie("form_id");
        this.closeDeleteFormModal();
      }
    });
  }

  /* loads all forms */
  loadForms(): void {
    this.selectFormTitles = [];
    this.formDataBase.loadForms().then((data:any) => {
      if(data)
      {
        for(this.i=0; this.i<data['data'].length;this.i++){
          this.selectFormTitles.push(
            {title: data['data'][this.i]['title'],id: data['data'][this.i]['_id']}
          )
        }
        this.refreshHierarchy();
      }
    });
  }

  /* for saving forms */
  saveForm(): void {
    this.dataservice.formId = this.Cookies.getCookie("form_id");
    this.dataservice.formData = JSON.stringify(this.dataservice.board);
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
        this.formData = data['data'][0]['formData'].replace(re, '"');
        if(this.formData !== 'empty')
        {
          this.formData = JSON.parse(this.formData);
          this.board = this.formData;
          console.log(this.board);
          if(this.board.length != 0)
          { 
            this.id = this.board[0]['id'];
            this.loadProperties(this.id);
          } else {
            this.closeProperties();
          }
        } else {
          this.closeProperties();
          this.board = [];
        }
        this.refreshHierarchy();
      }
    });
  }

  /* open form */
  openForm(): void {
    this.formDataBase.loadForm(this.openFormDropdown).then((data:any) => {
      if(data)
      {
        this.formTitle = data['data']['title'];
        this.workspaceTitle = data['data']['title'];
        this.Cookies.setCookie("form_id", this.openFormDropdown, 1, "/");
        this.loadFormData(this.openFormDropdown);
        this.initializeWorkspace();
        this.closeOpenFormModal();
        this.refreshHierarchy();
      }
    });
  }

  /* for loading/opening forms */
  loadForm(formId): void {
    this.formDataBase.loadForm(this.formId).then((data:any) => {
      if(data)
      {
        this.formTitle = data['data']['title'];
        this.workspaceTitle = data['data']['title'];
        this.Cookies.setCookie("form_id", this.formId, 1, "/");
        this.loadFormData(this.formId);
        this.initializeWorkspace();
      }
    });
  }
  
  /* for creating forms */
  createForm(): void {
    this.formId = this.formDataBase.newForm(this.formTitle).then((data:any) => {
    setTimeout(
      () => {
      if(this.formId)
      {
        this.formId = data['data']['_id'];
        this.formTitle = data['data']['title'];
        this.workspaceTitle = data['data']['title'];
        this.board = [];
        /* setcookie to remember the form id */
        this.Cookies.setCookie("form_id", this.formId, 1, "/");
        this.initializeWorkspace();
      }
    });
    }, 2500)
  }

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
      this.dyanmicDownloadByHtmlTag({
        fileName: this.dataservice.workspaceTitle + '.xml',
        text: JSON.stringify(this.dataservice.board)
      });
    }
  }


}
