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

import { ProfessionalExperienceRoutingModule } from './professional-experience-routing.module';

import { ProfessionalExperienceComponent } from '../../components/professional-experience/professional-experience.component';

import { SelectorHeaderModule } from '../selector-header/selector-header.module';
import { SelectorModule } from '../selector/selector.module';

/** ProfessionalExperience module. */
@NgModule({
  declarations: [ProfessionalExperienceComponent],
  imports: [
    CommonModule,
    ProfessionalExperienceRoutingModule,
    SelectorHeaderModule,
    SelectorModule,
  ],
  exports: [ProfessionalExperienceComponent]
})
export class ProfessionalExperienceModule { }
