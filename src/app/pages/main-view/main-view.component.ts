import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ItemComponent } from '../../interfaces/item-component';
import { FormComponent } from '../../interfaces/form-component';
import { ElementDatabaseService } from '../../services/element-database.service'
import { FormDatabaseService } from '../../services/form-database.service'
import { CookieService } from '../../services/cookie.service'
import { FormBoardComponent } from '../../modules/form-board/form-board.component';
import { PropertiesWindowComponent } from '../../modules/properties-window/properties-window.component';
import { DataService } from '../../services/data-service.service';
import { HierarchyComponent } from '../../modules/hierarchy/hierarchy.component';
import { ToolBarComponent } from '../../modules/tool-bar/tool-bar.component';
import { cloneDeep } from 'lodash';
import { FormDataServiceService } from 'src/app/services/form-data-service.service';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: [
    './main-view.component.scss'
  ],
  providers: [DatePipe]
})
export class MainViewComponent implements OnInit {
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
  constructor(
    private elementDataBase: ElementDatabaseService,
    private formDataBase: FormDatabaseService,
    public Cookies: CookieService,
    private datePipe: DatePipe,
    public dataservice: DataService,
    public formboard: FormBoardComponent,
    public formDataService: FormDataServiceService
  ) { }

  ngOnInit() {
    
    this.dataservice.selectFormTitles = [];
   
    if (!!this.dataservice.autoSave == true) {
      setInterval(
        () => {
          console.log(this.dataservice.autoSaveInterval);
          this.formDataService.saveForm();
        }, this.dataservice.autoSaveInterval)
    }
      

  }
  
  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  

}
