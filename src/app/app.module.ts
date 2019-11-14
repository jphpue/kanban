import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormBoardComponent } from './modules/form-board/form-board.component';
import { HierarchyComponent } from './modules/hierarchy/hierarchy.component';
import { ToolBarComponent } from './modules/tool-bar/tool-bar.component';
import { PropertiesWindowComponent } from './modules/properties-window/properties-window.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

 
@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    FormBoardComponent,
    HierarchyComponent,
    ToolBarComponent,
    PropertiesWindowComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 

