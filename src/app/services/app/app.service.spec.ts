// eslint-disable-next-line no-redeclare
/*global globalThis*/
import { TestBed } from '@angular/core/testing';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { AppService } from './app.service';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('AppService', () => {
  let service: AppService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientModule,
      ],
      providers: [AppService]
    }).compileComponents();
    service = TestBed.inject(AppService);
    debugService = service as any;
    debugService.uiService.windowReload = TestingCommon.mockWindowReload;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check for updates', () => {
    expect(() => {
      [true, false].forEach((confirmed) => {
        globalThis.confirm = () => confirmed;

        [true, false].forEach((_) => {
          debugService.swUpdate = { isEnabled: _, available: of({} as UpdateAvailableEvent) } as SwUpdate;
          service.tryCheckForUpdates();
        });
        debugService.checkForUpdates();
        debugService.onCheckForUpdates();
      });
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      const beforePrintHandler = () => { };
      const afterPrintHandler = () => { };

      service.detectMedia(beforePrintHandler, afterPrintHandler);
      const matchMedia = globalThis.matchMedia;
      (globalThis as any).matchMedia = false;
      service.detectMedia(beforePrintHandler, afterPrintHandler);
      globalThis.matchMedia = matchMedia;

      [true, false].forEach((_) => {
        debugService.onDetectMedia(beforePrintHandler, afterPrintHandler, _);
      });
    }).not.toThrowError();
  });

  it('should check subscribeUiInvalidated method with false', () => {
    expect(() => {
      let readAll;
      readAll = service.subscribeUiInvalidated(() => { });
      debugService.uiService.uiInvalidated$.emit(false);
      readAll = service.unsubscribeUiInvalidated();
    }).not.toThrowError();
  });

  it('should check subscribeUiInvalidated method with true', () => {
    expect(() => {
      let readAll;
      readAll = service.subscribeUiInvalidated(() => { });
      debugService.uiService.uiInvalidated$.emit(true);
      readAll = service.unsubscribeUiInvalidated();
    }).not.toThrowError();
  });

  it('should check subscribeUiInvalidated method when uiInvalidated is false', () => {
    expect(() => {
      let readAll;
      readAll = service.subscribeUiInvalidated(() => { });
      debugService.uiService.uiInvalidated$ = false;
      readAll = service.unsubscribeUiInvalidated();
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      const readAll = debugService.swUpdate;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const readAll = debugService.windowReload();
    }).not.toThrowError();
  });
});
