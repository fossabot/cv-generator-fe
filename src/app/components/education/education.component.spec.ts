import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationComponent } from './education.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        EducationComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
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
    expect(component.schoolDetail({
      'Id': 1,
      'From': 34728,
      'To': 37229,
      'School': 'Lorem ipsum dolor sit amet, con',
      'Degree': '',
      'Field': 'Lorem ipsum dolor sit amet, cons',
      'Grade': '',
      'Description': [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
      ],
      'Link': 'Lorem ipsum dolor sit amet',
      'Image': 'Lorem ipsum dolor sit amet',
      'Color': '#008080C0'
    })).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.dateFormat;
    }).not.toThrowError();
  });
});
