import { Component, OnInit, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ItemComponent } from '../../interfaces/item-component';
import { FormComponent } from '../../interfaces/form-component';
import { ElementDatabaseService } from '../../services/element-database.service'
import { FormDatabaseService } from '../../services/form-database.service'
import { CookieService } from '../../services/cookie.service'
import { DataService } from '../../services/data-service.service';

import { PropertiesWindowComponent } from '../../modules/properties-window/properties-window.component';
import { FormBoardComponent } from '../../modules/form-board/form-board.component';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class HierarchyComponent implements OnInit {

  constructor(
    private elementDataBase: ElementDatabaseService,
    private formDataBase: FormDatabaseService,
    public Cookies: CookieService,
    public dataservice: DataService,
    public props: PropertiesWindowComponent
  ) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      //console.log("hierarchy array ", this.dataservice.hierarchyItems);
      const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
      var newId = Math.floor(Math.random() * Math.floor(20000));
      clone['id'] = newId;
      this.dataservice.checkId(clone);

      console.log(newId);
      setTimeout(
        () => {
          this.props.loadProperties(newId, event,null);
        }, 50)


        
      // Add the clone to the new array.
      event.container.data.splice(event.currentIndex, 0, clone);

    }
    //this.loadProperties(id:number, item: event);
    this.refreshHierarchy();
    
  }

  dropHierarchy(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }
  noReturnPredicate() {
    return false;
  }
  

  refreshHierarchy() {
    this.dataservice.hierarchyItems = [];
    for(  this.dataservice.i=0;   this.dataservice.i<  this.dataservice.board.length;  this.dataservice.i++){
      this.dataservice.hierarchyItems.push(
        {title:this.dataservice.board[this.dataservice.i]['title'], id:  this.dataservice.board[this.dataservice.i]['id'],default:  this.dataservice.board[this.dataservice.i]['default']}
      )
    }
  }

  

}
