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
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { Accomplishment } from '../../classes/accomplishment/accomplishment';

import { CourseIndexComponent } from './course-index.component';

import { ClassifierService } from '../../services/classifier/classifier.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EngineService } from '../../services/engine/engine.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

// eslint-disable-next-line max-lines-per-function
describe('CourseIndexComponent', () => {
  let component: CourseIndexComponent;
  let fixture: ComponentFixture<CourseIndexComponent>;
  let sorterService: SorterService;
  let truncatorService: TruncatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        CourseIndexComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    sorterService = TestBed.inject(
      SorterServiceFactory.InjectionToken(SorterKind.Accomplishments,
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
    truncatorService = TestBed.inject(
      TruncatorServiceFactory.InjectionToken(TruncatorKind.Cv,
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should create with no params', () => {
    expect(() => {
      const readAll = new CourseIndexComponent(
        TestBed.inject(PortfolioService),
        TestBed.inject(EngineService),
        TestBed.inject(ClassifierService),
        TestBed.inject(SorterService),
        TestBed.inject(TruncatorService),
        TestBed.inject(InputService),
        TestBed.inject(UiService),
        TestBed.inject(DataService),
        TestBed.inject(ExcelDateFormatterService),
        undefined,
      );
    }).not.toThrowError();
  });

  it('should try dispatch frequency click event', () => {
    expect(() => {
      const element = component.clickable?.nativeElement;
      if (element) {
        element.title = 'Search for this';
        const handler = (event: MouseEvent) => component.updateSearchToken(event);
        element.addEventListener('click', handler);
        element.click();
        element.removeEventListener('click', handler);
      }
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.key;
      const accomplishment = component.propertyName = new Accomplishment();
      accomplishment.Language = 'some language';
      readAll = component.key;

      readAll = component.frequenciesCacheKey;
      readAll = component.frequency;

      accomplishment.Language = '';
      ['Certification', 'Conference', 'Brigade', 'Ownership', 'Training', 'Language course', 'Honor and Award', 'Interest and Hobby']
        .forEach((_) => {
          accomplishment.Type = _;
          readAll = component.frequenciesCacheKey;
          readAll = component.frequency;
        });

      readAll = component.frequenciesDivider;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.getFrequencyStyle(component.engine.filterService.emptyFrequency);
      readAll = component.updateSearchToken(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});
