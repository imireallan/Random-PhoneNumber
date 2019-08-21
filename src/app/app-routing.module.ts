import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomNumberComponent } from './random-number/random-number.component';

const routes: Routes = [{ path: '', component: RandomNumberComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
