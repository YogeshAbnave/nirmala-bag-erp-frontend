import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SidebarModule, ButtonModule ]
})
export class LoginRoutingModule { }
