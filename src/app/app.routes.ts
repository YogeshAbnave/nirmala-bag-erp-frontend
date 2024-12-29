import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login/login.component';
import { AuthGuard, LoginGuard } from './shared/_authguard/auth.guard';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { EmployeeComponent } from './component/employee/employee/employee.component';
import { OrderComponent } from './component/order/order/order.component';
import { ProductsComponent } from './component/products/products/products.component';
import { SettingComponent } from './component/setting/setting/setting.component';
import { ContactsComponent } from './component/contacts/contacts/contacts.component';
import { CustomersComponent } from './component/customers/customers/customers.component';
export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    { path: 'login', component: LoginComponent, canActivateChild: [LoginGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivateChild: [AuthGuard] },
    { path: 'employees', component: EmployeeComponent,canActivateChild: [AuthGuard] },
    { path: 'order', component: OrderComponent,canActivateChild: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivateChild: [AuthGuard] },
    { path: 'setting',component: SettingComponent, canActivateChild: [AuthGuard] },
    { path: 'contacts', component: ContactsComponent, canActivateChild: [AuthGuard] },
    { path: 'customers', component: CustomersComponent, canActivateChild: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }