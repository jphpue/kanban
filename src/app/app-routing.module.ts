import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { DatePipe } from '@angular/common';
import { ElementDatabaseService } from './services/element-database.service';
import { HierarchyComponent } from './modules/hierarchy/hierarchy.component';


const routes: Routes = [{
  path:'', component: MainViewComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[DatePipe, HierarchyComponent]
})
export class AppRoutingModule { }
