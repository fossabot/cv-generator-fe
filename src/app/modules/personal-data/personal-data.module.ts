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
import { CommonModule } from '@angular/common';

import { PersonalDataRoutingModule } from './personal-data-routing.module';

import { PersonalDataComponent } from '../../components/personal-data/personal-data.component';

import { SelectorHeaderModule } from '../selector-header/selector-header.module';
import { SelectorModule } from '../selector/selector.module';

/** PersonalData module. */
@NgModule({
  declarations: [PersonalDataComponent],
  imports: [
    CommonModule,
    PersonalDataRoutingModule,
    SelectorHeaderModule,
    SelectorModule,
  ],
  exports: [PersonalDataComponent]
})
export class PersonalDataModule { }
