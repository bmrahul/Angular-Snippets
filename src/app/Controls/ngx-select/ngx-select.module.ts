import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSelectSingleComponent } from './ngx-select-single/ngx-select-single.component';
import { NgxSelectMultipleComponent } from './ngx-select-multiple/ngx-select-multiple.component';
import { NgxSelectEquipmentComponent } from '../../components/ngx-select-equipment/ngx-select-equipment.component';
import { NgxSelectFunctionalComponent } from '../../components/ngx-select-functional/ngx-select-functional.component';
import { EquipmentImageComponent } from "../../components/equipment-image/equipment-image.component";



@NgModule({
  declarations: [
    NgxSelectSingleComponent,
    NgxSelectMultipleComponent,
    NgxSelectEquipmentComponent,
    NgxSelectFunctionalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    EquipmentImageComponent
],
  exports: [
    NgxSelectSingleComponent,
    NgxSelectMultipleComponent,
    NgxSelectEquipmentComponent,
    NgxSelectFunctionalComponent,
  ]
})
export class NgxSelectModule { }
