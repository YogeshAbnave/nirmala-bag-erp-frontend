import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
@NgModule({
 
    imports: [
      AppRoutingModule,
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
    ],
  declarations: [
  ],
  bootstrap: [] 
})
export class AppModule { }
