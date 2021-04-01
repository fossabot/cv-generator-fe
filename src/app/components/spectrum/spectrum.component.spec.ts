import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SpectrumComponent } from './spectrum.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

describe('SpectrumComponent', () => {
  let component: SpectrumComponent;
  let fixture: ComponentFixture<SpectrumComponent>;
  let portfolioService: PortfolioService;
  let sorterService: SorterService;
  let truncatorService: TruncatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        SpectrumComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    portfolioService = TestBed.inject(PortfolioService);
    sorterService = TestBed.inject(
      SorterService.InjectionToken(SorterKind.Spectrum,
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
    truncatorService = TestBed.inject(
      TruncatorService.InjectionToken(TruncatorKind.Ps,
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumComponent);
    component = fixture.componentInstance;

    component.key = 'Client';
    portfolioService.tagCloud = TagCloudDisplayMode.chart;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should resize window', () => {
    expect(() => {
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize chart', () => {
    expect(() => {
      portfolioService.tagCloud = TagCloudDisplayMode.chart;
      component.Initialize();
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize tag cloud', () => {
    expect(() => {
      portfolioService.tagCloud = TagCloudDisplayMode.tagCloud;
      component.Initialize();
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize both tag cloud and chart', () => {
    expect(() => {
      portfolioService.tagCloud = TagCloudDisplayMode.both;
      component.Initialize();
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should check ui', () => {
    expect(() => {
      const readAll = component.portfolioService.ui;
    }).not.toThrowError();
  });

  it('should check key', () => {
    expect(() => {
      const readAll = component.key;
    }).not.toThrowError();
  });

  it('should check tagCloud', () => {
    expect(() => {
      const readAll = component.portfolioService.tagCloud;
    }).not.toThrowError();
  });

  it('should respond to search', () => {
    expect(() => {
      portfolioService.SearchToken = 'kon';
    }).not.toThrowError();
  });

  it('should check simpleChart', () => {
    expect(() => {
      const readAll = component.simpleChart;
    }).not.toThrowError();
  });

  it('should check chartHeight and chartWidth', () => {
    expect(() => {
      // combine optional params
      ['Client', ''].forEach((key) => {
        component.key = key;
        [TagCloudDisplayMode.chart, TagCloudDisplayMode.both].forEach((tagCloud) => {
          portfolioService.tagCloud = tagCloud;

          let readAll;
          readAll = component.chartHeight;
          readAll = component.chartWidth;
        });
      });
    }).not.toThrowError();
  });

  it('should check getFrequenciesCache', () => {
    expect(() => {
      const readAll = component.getFrequenciesCache(component.key);
    }).not.toThrowError();
  });

  it('should check onResize', () => {
    expect(() => {
      const readAll = component.onResize();
    }).not.toThrowError();
  });

  it('should check onBeforePrint', () => {
    expect(() => {
      // globalThis.print();
      const readAll = component.onBeforePrint(new Event('print'));
      globalThis.dispatchEvent(new KeyboardEvent('keypress', { key: 'Escape' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.inputService.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      component.PsFocusThreshold = component.PsFocusThreshold;

      let readAll;
      readAll = component.portfolioService.tagCloud;
      readAll = component.uiService.frequenciesDivider;

      readAll = component.trackByFn(0, 0);

      const propertyName = 'Responsibilities';
      readAll = component.getFrequenciesCache(propertyName);

      readAll = component.truncatorService.truncated([]);
      readAll = component.truncatorService.remaining([]);
      readAll = component.truncatorService.remainingLength([]);
      readAll = component.getFrequencyStyle(component.portfolioService.filterService.emptyFrequency);

      readAll = component.TagCloudDisplayMode;
    }).not.toThrowError();
  });
});
