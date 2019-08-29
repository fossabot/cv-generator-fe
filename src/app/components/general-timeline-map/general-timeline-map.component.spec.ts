import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTimelineMapComponent } from './general-timeline-map.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('GeneralTimelineMapComponent', () => {
  let component: GeneralTimelineMapComponent;
  let fixture: ComponentFixture<GeneralTimelineMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        GeneralTimelineMapComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTimelineMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter results', () => {
    expect(() => {
      component.portfolioComponent.searchToken = 'kon';
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      component.drawGeneralTimeline();
      readAll = component.mapData;
    }).not.toThrowError();
  });
});