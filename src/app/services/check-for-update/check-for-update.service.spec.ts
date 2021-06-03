import { TestBed } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { CheckForUpdateService } from './check-for-update.service';

// eslint-disable-next-line max-lines-per-function
describe('CheckForUpdateService', () => {
  let service: CheckForUpdateService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceWorkerModule.register('', { enabled: false })],
      providers: [
        CheckForUpdateService,
        HttpClientModule,
      ]
    });
    service = TestBed.inject(CheckForUpdateService);
    debugService = service as any;

    TestingCommon.disableLogging();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = debugService.checkForUpdate();

      readAll = debugService.reportCheck();

      readAll = debugService.onCheckForUpdateEvent(1);

      readAll = debugService.checkForUpdateSubscribe(1000);
    }).not.toThrowError();
  });
});
