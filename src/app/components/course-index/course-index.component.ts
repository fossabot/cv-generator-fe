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
import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { EngineService } from '../../services/engine/engine.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';

import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';

// import { Accomplishment } from '../../classes/accomplishment/accomplishment';
import { Accomplishment } from '../../interfaces/cv/accomplishment';
import { ClassifierService } from '../../services/classifier/classifier.service';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

/**
 * Course index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.scss']
})
export class CourseIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef<HTMLAnchorElement>;

  /** The key. */
  public get key() { return this.classifierService.isLanguage(this.propertyName as Accomplishment) ? 'Language' : 'Name'; }

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Update search token delegate. */
  public updateSearchToken(event: MouseEvent) { this.engine.searchService.updateSearchToken(event); }

  /**
   * Constructs the Course index component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param classifierService The classifier service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly engine: EngineService,
    public readonly classifierService: ClassifierService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Accomplishments)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Cv)) public readonly truncatorService: TruncatorService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly dataService: DataService,
    public readonly excelDateFormatterService: ExcelDateFormatterService,
    public readonly params?: Params) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService, params);
    if (typeof this.params !== 'undefined') {
      this.i = this.params.i;
    }
  }

  // public get platform() {
  //   return this.classifierService.platform;
  // }
  // public get ontologyEntry() {
  //   return this.classifierService.ontologyEntry.category;
  // }

  /** Get frequency. Match frequency for the template to the precalculated cache. */
  public get frequency() {
    return this.portfolioService.getFrequency(this.frequenciesCacheKey, this.propertyName[this.key]);
  }

  /** Get frequency cache key. */
  public get frequenciesCacheKey() {
    const accomplishment = this.propertyName as Accomplishment;

    const frequenciesCacheKey = [
      { predicate: this.classifierService.isLanguage, cacheKey: 'Language' },
      { predicate: this.classifierService.isCertification, cacheKey: 'Certification' },
      { predicate: this.classifierService.isOrganization, cacheKey: 'Organization' },
      { predicate: this.classifierService.isHonorAndAward, cacheKey: 'Honor and Award' },
      { predicate: this.classifierService.isVolunteering, cacheKey: 'Volunteering' },
      { predicate: this.classifierService.isInterestAndHobby, cacheKey: 'Interest and Hobby' },
      { predicate: this.classifierService.isVacation, cacheKey: 'Vacation' },
      // { predicate: this.classifierService.isCourse, cacheKey: 'Name' },
    ].find((_) => _.predicate.apply(this.classifierService, [accomplishment]))?.cacheKey ?? this.key;

    return frequenciesCacheKey;
  }

  // /** Get JSON. */
  // public get JSON() { return JSON; }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    return this.uiService.getFrequencyStyle(frequency, this.truncatorService.TagCloudEmphasis);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}
