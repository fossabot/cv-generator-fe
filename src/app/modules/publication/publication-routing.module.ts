// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationComponent } from '../../components/publication/publication.component';
const routes: Routes = [
  { path: '', component: PublicationComponent },
  { path: 'publication-index',
    loadChildren: () => import('../publication-index/publication-index.module').then((m) => m.PublicationIndexModule) },
  { path: 'publication-list',
    loadChildren: () => import('../publication-list/publication-list.module').then((m) => m.PublicationListModule) }
];

/**
 * Publication routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule { }
