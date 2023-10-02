import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminComponent },  
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
