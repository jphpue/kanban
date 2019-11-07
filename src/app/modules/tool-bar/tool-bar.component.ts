import { Component, OnInit, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ItemComponent } from '../../interfaces/item-component';
import { FormComponent } from '../../interfaces/form-component';
import { ElementDatabaseService } from '../../services/element-database.service'
import { FormDatabaseService } from '../../services/form-database.service'
import { CookieService } from '../../services/cookie.service'
import { DataService } from '../../services/data-service.service';
import { MainViewComponent } from '../../pages/main-view/main-view.component';
import { FormBoardComponent } from '../../modules/form-board/form-board.component';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ToolBarComponent implements OnInit {

  components: object[];/*
  isComponentsLoaded: boolean = false;
  
  isNewModalActive: boolean = false;
  isOpenModalActive: boolean = false;
  isExportModalActive: boolean = false;
  isSettingsModalActive: boolean = false;
  isDeleteFormModalActive: boolean = false;
  isPropertiesModalActive: boolean = false;
  */

  constructor(
    private elementDataBase: ElementDatabaseService,
    public dataservice: DataService
    
  ) { }

  ngOnInit() {
    this.dataservice.test();
  }
  noReturnPredicate() {
    return false;
  }

 

  destroyElements(): void {
    this.dataservice.components.length = 0;
    this.dataservice.isComponentsLoaded = false;
  }
  


}
