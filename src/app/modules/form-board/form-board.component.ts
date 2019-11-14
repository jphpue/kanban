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
import { Comboboxitems } from 'src/app/interfaces/comboboxitems';
import { Parent } from 'src/app/interfaces/parent';
import { Prompt } from 'src/app/interfaces/prompt';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
import { FormDataServiceService } from 'src/app/services/form-data-service.service';


@Component({
  selector: 'app-form-board',
  templateUrl: './form-board.component.html',
  styleUrls: ['./form-board.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class FormBoardComponent implements OnInit {

  constructor(
    public toolbar: ToolBarComponent,
    public Cookies: CookieService,
    private elementDataBase: ElementDatabaseService,
    private props: PropertiesWindowComponent,
  
    public hierarchy:HierarchyComponent,
    private formDataBase: FormDatabaseService,
    public datePipe: DatePipe,
    public dataservice: DataService,
    public formDataService: FormDataServiceService,
     

  ) { }

  ngOnInit() {
    this.formDataService.loadForms();
    //this.dataservice.loadSettings();
   
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      console.log(event.previousContainer.data);
      const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
      var newId = Math.floor(Math.random() * Math.floor(20000));
      clone['id'] = newId;
      //this.checkId(clone);
     
      console.log(newId);
      setTimeout(
        () => {
          this.props.loadProperties(newId, event,null);
        }, 50)
    // Add the clone to the new array.
      event.container.data.splice(event.currentIndex, 0, clone);
    
    }
    //this.loadProperties(id:number, item: event);
    console.log(this.dataservice.board.length);
    this.hierarchy.refreshHierarchy();

  }

  dropHierarchy(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
