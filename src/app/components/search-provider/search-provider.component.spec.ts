/* eslint-disable max-statements */
/* eslint-disable max-lines */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SearchProviderComponent } from './search-provider.component';

import { AppModule } from '../../app.module';

import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('SearchProviderComponent', () => {
  let component: SearchProviderComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<SearchProviderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        SearchProviderComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProviderComponent);
    debugComponent = fixture.debugElement.componentInstance;
    debugComponent.uiService.windowReload = TestingCommon.mockWindowReload;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for data', () => {
    expect(() => {
      component.SearchToken = 'kon or bul';
    }).not.toThrowError();
  });

  it('should clear search', () => {
    expect(() => {
      component.clearSearch();
    }).not.toThrowError();
  });

  it('should reload window', () => {
    expect(() => {
      debugComponent.windowReload();
    }).not.toThrowError();
  });

  it('should start all over', () => {
    expect(() => {
      component.startAllOver();
    }).not.toThrowError();
  });

  it('should use instant search', () => {
    expect(() => {
      component.InstantSearch = component.InstantSearch;
    }).not.toThrowError();
  });

  it('should label elements', () => {
    expect(() => {
      component.label('element');
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.ToggleKind;

      readAll = component.decorations;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const instantSearch = component.InstantSearch;
      component.InstantSearch = instantSearch;
    }).not.toThrowError();
  });
});
