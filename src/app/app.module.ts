import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
 
    imports: [
      // BrowserAnimationsModule,
      NoopAnimationsModule,
      AppRoutingModule,
      BrowserModule,
      ReactiveFormsModule,
      CommonModule,
      HttpClientModule,
    ],
  declarations: [
  ],
  bootstrap: [] 
})
export class AppModule { }
