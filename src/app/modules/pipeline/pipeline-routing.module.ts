import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PipelineComponent } from '../../components/pipeline/pipeline.component';
const routes: Routes = [
  { path: '', component: PipelineComponent },
  { path: 'geolocation', loadChildren: () => import('../geolocation/geolocation.module').then(m => m.GeolocationModule) },
];

/**
 * Pipeline routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipelineRoutingModule { }
