import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import {ItemComponent} from '../../interfaces/item-component';
import {ElementDatabaseService} from 'src/app/services/element-database.service'
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  components: object[];
  component : object;
  todo: string[];
  template ="Template";
  boardMain = "Board";
  componentsTitle = "Components";
  itemPrompt: string;
  idForBoard: number;
  i:number;
  idList=[];

  

  constructor(private elementDataBase: ElementDatabaseService) { }

  ngOnInit() {
    
    this.getElements();

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
            console.log(" board: ",this.board);
            const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
            clone['id']=Math.floor(Math.random() * Math.floor(20000));;
            this.checkId(clone);
                  
            

    // Add the clone to the new array.
           event.container.data.splice(event.currentIndex, 0, clone);
      
    }
  
  }
  noReturnPredicate() {
    return false;
  }

  
  board = [
    
  ]; 

  


  editItem(item:ItemComponent): void{
    
    item.editing=true;
    
   
  }

  deleteItem(id:number){
    console.log("deleting id: "+id);
    this.board = this.board.filter(board=>board.id!==id);
    delete this.idList[this.board[id]];
   
  }

  getElements(): void {
    this.components=this.elementDataBase.getElements();
    //console.log(this.components +" components");
  }

 

  checkId(clone:any): void{
    if(this.idList.includes(clone['id'])){
      clone['id']= Math.floor(Math.random()*Math.floor(2000));
     
     
    }
    if(this.idList.includes(clone['id']))
    this.checkId(clone);
    
    this.idList.push(clone['id']);
    
    
  }
}
