import { Component, OnInit, Input,Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
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
  saveProperties() {
      
      this.dataservice.component = this.dataservice.board.filter(
      board => this.dataservice.board.id === this.id);

    //if(this.dataservice.component===undefined) return
    for (let obj of this.dataservice.component) {
      
      for (let key in obj) {
       
        if (key != '_id'
          && key != 'create_date'
          && key != 'editing'
          && key != 'main'
          && key != 'default') {
          console.log(this.dataservice.component);
          console.log(this.dataservice.component[0][key])
          this.dataservice.component[0][key] = (<HTMLInputElement> document.getElementById(key)).value 
          /*this.dataservice.component[0][key] = value;
          let pushed={ title: key, value : obj[key] };
          this.dataservice.properties.push(pushed)*/
        }
        
      }
      
      this.loadProperties(this.dataservice.component[0]["id"],null,null)
    }
    this.dataservice.refreshHierarchy();
  }

  loadProperties(id: number, item: CdkDragDrop<string[]>, event) {
     console.log(item);
     this.dataservice.properties = [];
     this.dataservice.defaultItems= [];
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
             && key != 'main'
            )
          {
            if(key != 'default'){
              this.dataservice.properties.push(
                {title: key,value: obj[key]}
              )
            }
            
            if(key=='default'){
              
              console.log(obj['default']);
              this.dataservice.defaultItems.push(
              { prompt: obj['default']['prompt'] }
              )
              console.log(this.dataservice.defaultItems);
              /*for (let key2 of key){
                console.log(key);
                this.dataservice.defaultItems.push(
                  {title: key}
                )
              }*/
            }
          }
         
        }
        console.log(this.dataservice.defaultItems);
    }
    
    console.log(this.dataservice.component);
  }
  refreshProperties() {
    if (this.dataservice.board.length != 0) {
      this.dataservice.id = this.dataservice.board[0]['id'];
      //this.loadProperties(this.id,null,null);
    } else {
      this.dataservice.properties = [];
      this.dataservice.componentTitle = null;
    }
  }

  closeProperties() {
    this.dataservice.properties = [];
    this.dataservice.componentTitle = null;
  }
  togglePropertiesModal(){ 
    this.dataservice.isPropertiesModalActive = !this.dataservice.isPropertiesModalActive;
    console.log(this.dataservice.isPropertiesModalActive);
  }
  closePropertiesModal(){
    //this.isPropertiesModalActive= false;
    //console.log("formComponent properties "+ this.formComponent);
  }

}
