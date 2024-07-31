import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login/login.component';
import { LoginGuard } from './shared/_authguard/auth.guard';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { EmployeeComponent } from './component/employee/employee/employee.component';
import { OrderComponent } from './component/order/order/order.component';
import { ProductComponent } from './component/product/product/product.component';
import { SettingComponent } from './component/setting/setting/setting.component';
import { ClientComponent } from './component/client/client/client.component';
export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
      },
    { path: 'login',canActivateChild: [LoginGuard], component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'employees', component: EmployeeComponent },
    { path: 'order', component: OrderComponent },
    { path: 'product', component: ProductComponent },
    { path: 'setting', component: SettingComponent },
    { path: 'client', component: ClientComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }