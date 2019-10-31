import { Component, OnInit, Input,Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ItemComponent } from '../../interfaces/item-component';
import { FormComponent } from '../../interfaces/form-component';
import { DataService } from '../../services/data-service.service';
import { ElementDatabaseService } from '../../services/element-database.service'
import { FormDatabaseService } from '../../services/form-database.service'
import { CookieService } from '../../services/cookie.service'
import { ToolBarComponent } from '../../modules/tool-bar/tool-bar.component';
import { FormBoardComponent } from '../../modules/form-board/form-board.component';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-properties-window',
  templateUrl: './properties-window.component.html',
  styleUrls: ['./properties-window.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class PropertiesWindowComponent implements OnInit {

  constructor(
    private elementDataBase: ElementDatabaseService,
    private formDataBase: FormDatabaseService,
    public Cookies: CookieService,
    public dataservice: DataService
 
    
  ) { }

  ngOnInit() {
    
  }
  noReturnPredicate() {
    return false;
  }

  getElements(): void {
    this.dataservice.components = this.elementDataBase.getElements();
    //console.log(this.components +" components");
  }

  destroyElements(): void {
    this.dataservice.components.length = 0;
    this.dataservice.isComponentsLoaded = false;
  }


  /* saves the board item settings 
  @@TODO: check for clone id here
  */
 propertiesHandler(){
   this.saveProperties();

   //this.togglePropertiesModal();
 }
  saveProperties() {
  
    this.dataservice.component = this.dataservice.board.filter(
      board => this.dataservice.board.id === this.id);
      console.log(this.board[0]);
      console.log(this.formBoard.board);
    if(this.component===undefined) return
    for (let obj of this.boardComponent) {
      
      let key:string;
      for (let key in obj) {
        
        if (key != '_id'
          && key != 'create_date'
          && key != 'editing'
          && key != 'main') {
          //console.log(key);
          let value = (<HTMLInputElement> document.getElementById(key)).value
          console.log( this.component[0][key]);
          this.component[0][key] = value;
          console.log( this.component[0][key])
          
          let pushed={ title: key, value : obj[key] };
          this.properties.push(pushed)
          //console.log("saved");
        }
        this.loadProperties(this.boardComponent[0]["id"])
      }
    }
    //this.refreshHierarchy();
  }
  loadProperties(id: number, item: CdkDragDrop<string[]>, event) {
     console.log(item);
     this.dataservice.properties = [];
     this.dataservice.component = this.dataservice.board.filter(
          board => board.id === id);
          this.dataservice.componentTitle = this.dataservice.component[0]['title'];
          this.dataservice.activeProperty = this.dataservice.component[0]['_id']; 
          this.dataservice.id = id;
    
    for (let obj of this.dataservice.component) {
        for (let key in obj) {
          if(key != '_id' 
             && key != 'create_date' 
             && key != 'editing' 
             && key != 'main')
          {
            this.dataservice.properties.push(
              {title: key,value: obj[key]}
            )
          }
        }
    }
    
    console.log(this.dataservice.component);
  }
  refreshProperties() {
    if (this.board.length != 0) {
      this.id = this.board[0]['id'];
      //this.loadProperties(this.id,null,null);
    } else {
      this.properties = [];
      this.componentTitle = null;
    }
  }

  closeProperties() {
    this.properties = [];
    this.componentTitle = null;
  }
  togglePropertiesModal(){ 
    this.isPropertiesModalActive = !this.isPropertiesModalActive;
    console.log(this.isPropertiesModalActive);
  }
  closePropertiesModal(){
    //this.isPropertiesModalActive= false;
    console.log("formComponent properties "+ this.formComponent);
  }

}
