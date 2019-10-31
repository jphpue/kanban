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
  styleUrls: ['./form-board.component.scss']
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
    public hierarchy:HierarchyComponent
    
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


}
