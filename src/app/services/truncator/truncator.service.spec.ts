import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TruncatorService } from './truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';

// eslint-disable-next-line max-lines-per-function
describe('TruncatorService', () => {
  const truncatorService: { [key: string]: TruncatorService } = {
    Cv: {} as TruncatorService,
    Ps: {} as TruncatorService,
    Pp: {} as TruncatorService
  };

  let persistenceService: PersistenceService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        TruncatorService,
      ]
    });
    TruncatorServiceFactory.TruncatorKindValues.forEach((truncatorKind) => {
      truncatorService[TruncatorKind[truncatorKind]] = TestBed.inject(TruncatorServiceFactory.InjectionToken(truncatorKind,
        persistenceService = TestBed.inject(PersistenceService)
      ));
    });
  });

  it('should be created', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(service).toBeTruthy();
    });
  });

  it('should check public interface properties', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        let readAll;
        service.truncatorKind = service.truncatorKind;

        service.TagCloudEmphasis = service.TagCloudEmphasis;
        (ToggleKind as any).TagCloudEmphasis = -11 as ToggleKind;
        service.TagCloudEmphasis = service.TagCloudEmphasis;

        readAll = TruncatorService.focusThresholdDefaults;
        readAll = TruncatorService.focusThresholdDisplayValue;
        readAll = TruncatorService.focusThresholdPropertyName;

        service.FocusThreshold = service.FocusThreshold;
        service.persistenceService.getItem = () => null;
        service.FocusThreshold = service.FocusThreshold;
        TruncatorService.focusThresholdDefaults.get = () => undefined;
        service.FocusThreshold = service.FocusThreshold;

        readAll = TruncatorServiceFactory.TruncatorKindValues;
        readAll = TruncatorServiceFactory.providers;
      }).not.toThrowError();
    });
  });

  it('should check public interface methods', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        let readAll;
        readAll = TruncatorServiceFactory.tokenDescription(TruncatorKind.Pp);
        TruncatorServiceFactory.TruncatorKindValues.forEach((truncatorKind) => {
          const deps = [persistenceService];
          readAll = TruncatorServiceFactory.InjectionToken(truncatorKind, deps);
          readAll = TruncatorServiceFactory.useFactory(truncatorKind, deps);
        });

        readAll = service.truncated([]);
        readAll = service.remaining([]);
        readAll = service.remainingLength([]);

        debugService = service as any;
        readAll = debugService.truncated(undefined);
        readAll = debugService.remaining(undefined);
        readAll = debugService.remainingLength(undefined);

        readAll = service.modelChange('readAll', 5);
      }).not.toThrowError();
    });
  });
});
