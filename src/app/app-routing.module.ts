import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSelectComponent } from '../ngx-select/ngx-select.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'ngx-select', component: NgxSelectComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
