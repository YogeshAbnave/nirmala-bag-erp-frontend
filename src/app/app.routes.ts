// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//     {
//         path: "",
//         redirectTo: "/login",
//         pathMatch: "full"
//       },
//   { path: 'login', loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule) },
//   { path: 'dashboard', loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule) },
//   { path: 'employee', loadChildren: () => import('./component/employee/employee.module').then(m => m.EmployeeModule) },

//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { EmployeeComponent } from './component/employee/employee/employee.component';
import { LoginGuard } from './shared/_authguard/auth.guard';
export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
      },
    { path: 'login',canActivateChild: [LoginGuard], component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'employee', component: EmployeeComponent },

];