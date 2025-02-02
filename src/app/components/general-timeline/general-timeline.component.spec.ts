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

import { GeneralTimelineComponent } from './general-timeline.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

// eslint-disable-next-line max-lines-per-function
describe('GeneralTimelineComponent', () => {
  let component: GeneralTimelineComponent;
  let fixture: ComponentFixture<GeneralTimelineComponent>;
  let debugComponent: any;
  let portfolioService: PortfolioService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        GeneralTimelineComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    portfolioService = TestBed.inject(PortfolioService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTimelineComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter results', () => {
    expect(() => {
      component.engine.searchService.SearchToken = 'kon';
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.engine.model.filtered;
      readAll = component.engine.model.filtered.Accomplishments;
      readAll = component.engine.model.filtered.Projects;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      component.drawGeneralTimeline();
      readAll = component.generalTimelineDefined();
      readAll = debugComponent.onSearchTokenChanged();

      debugComponent.searchTokenSubscription = undefined;
      // tslint:disable-next-line: no-lifecycle-call
      readAll = component.ngOnDestroy();
    }).not.toThrowError();
  });
});
