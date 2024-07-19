import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectComponent } from './ngx-select/ngx-select.component';
import { NgSelectComponent } from './ng-select/ng-select.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
  ],
  declarations: [AppComponent, NgxSelectComponent, NgSelectComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
