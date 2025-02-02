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

import { EducationComponent } from './education.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

// eslint-disable-next-line max-lines-per-function
describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        EducationComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have school detail', () => {
    component.propertyName = {
      Id: 1,
      From: 34728,
      To: 37229,
      School: 'Lorem ipsum dolor sit amet, con',
      Field: 'Lorem ipsum dolor',
      Major: 'Lorem ipsum dolor sit amet, cons',
      Degree: '',
      Honors: '',
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ',
      Link: 'Lorem ipsum dolor sit amet',
      Image: 'Lorem ipsum dolor sit amet',
      Color: '#008080C0',
      Highlight: '',
      Grade: ''
    };
    expect(component.schoolDetail).toBeTruthy();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check dateFormat', () => {
    expect(() => {
      const readAll = component.dateFormat;
    }).not.toThrowError();
  });

  it('should check trackByFn', () => {
    expect(() => {
      const readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.honors;

      readAll = component.PropertyComponent;
    }).not.toThrowError();
  });
});
