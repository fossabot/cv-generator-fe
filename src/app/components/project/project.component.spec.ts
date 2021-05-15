/* eslint-disable max-statements */
/* eslint-disable max-lines */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { ProjectComponent } from './project.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { MockDataService } from '../../services/mock-data/mock-data.service';
import { Project } from '../../classes/project/project';
import { HttpClient } from '@angular/common/http';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

// eslint-disable-next-line max-lines-per-function
describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let mockDataService: MockDataService;
  let sorterService: SorterService;
  let truncatorService: TruncatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule,
      ],
      providers: [
        ProjectComponent,
        HttpClient
      ]
    }).compileComponents();
    mockDataService = TestBed.inject(MockDataService);
    sorterService = TestBed.inject(
      SorterServiceFactory.InjectionToken(SorterKind.Projects,
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
    truncatorService = TestBed.inject(
      TruncatorServiceFactory.InjectionToken(TruncatorKind.Pp,
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize taking mock data', () => {
    expect(() => { component.LoadData(mockDataService); }).not.toThrowError();
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

  it('should check decorations', () => {
    expect(() => {
      const readAll = component.portfolioService.toolbarService.decorations;
    }).not.toThrowError();
  });

  it('should check tabName', () => {
    expect(() => {
      const readAll = component.uiService.tabName('');
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

  it('should respond to search', () => {
    expect(() => {
      component.engine.searchService.SearchToken = 'test';
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      const readAll = component.persistenceService.saveToggle(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.inputService.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.uiService.frequenciesDivider;
      readAll = component.portfolioService.model.entitiesModel.countCache;

      readAll = component.SorterKind;
      readAll = component.ProjectIndexComponent;
      readAll = component.ProjectContributionsComponent;
      readAll = component.ProjectListComponent;
      readAll = component.ProjectCardComponent;

      readAll = component.projects;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.getInjector({});
      readAll = component.getInjector({}, 1);
      readAll = component.portfolioService.getProjectStartsNewPeriod(new Project());
      readAll = component.portfolioService.getDecryptedProjectPeriod(new Project());
      readAll = component.uiService.tabName('');
      readAll = component.trackByFn(0, 0);
      readAll = component.isInNaturalOrder();

      readAll = component.truncatorService.truncated([]);
      readAll = component.truncatorService.remaining([]);
      readAll = component.truncatorService.remainingLength([]);
    }).not.toThrowError();
  });
});
