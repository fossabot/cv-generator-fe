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
import { Component } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { Education } from '../../interfaces/cv/education';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';

/**
 * Education component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends PropertyComponent {
  /** Injected education getter. */
  public get propertyName(): Education { return super.propertyName as Education; }

  /** Injected education setter. */
  public set propertyName(value: Education) { super.propertyName = value; }

  /** Honors education property. */
  public get honors() { return this.propertyName.Honors; }

  /** Property component ComponentOutlet hook. */
  public get PropertyComponent() { return PropertyComponent; }

  /** Date format */
  public get dateFormat() { return this.uiService.localizationService.dateFormatShort; }

  /**
   * Constructs the Education component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly dataService: DataService,
    public readonly excelDateFormatterService: ExcelDateFormatterService,
    public readonly params?: Params) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService, params);
  }

  /** Education subject. */
  public get schoolSubject() {
    const field = 'Field';
    return [
      this.propertyName[field],
      this.schoolDetail
    ]
      .filter((_) => typeof _ !== 'undefined' && _ !== null && _ !== '')
      .join(': ');
  }

  /** Education detail. */
  public get schoolDetail() {
    const degree = 'Degree';
    const major = 'Major';
    return [
      this.propertyName[degree],
      this.propertyName[major]
    ]
      .filter((_) => typeof _ !== 'undefined' && _ !== null && _ !== '')
      .join(' in ');
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}
