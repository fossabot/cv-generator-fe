// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';

import { IsSecureGuardService } from './is-secure-guard.service';
import { environment } from '../../../environments/environment.heroku';

// eslint-disable-next-line max-lines-per-function
describe('IsSecureGuardService', () => {
  let service: IsSecureGuardService;
  let debugService: any;
  const routeMock: any = { snapshot: {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSecureGuardService]
    });
    service = TestBed.inject(IsSecureGuardService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check canActivate', () => {
    expect(() => {
      const environmentProduction = environment.production;
      // const locationProtocol = location.protocol;
      const environmentHosts = environment.hosts;

      [false, true].forEach((_) => {
        environment.production = _;

        //   ['http:', 'https:'].forEach(__ => {
        //     location.protocol = __;

        [[], [location.hostname]].forEach((___) => {
          environment.hosts = ___;

          const readAll = {
            canActivate: service.canActivate(routeMock)
          };
        });
        //   });
      });

      environment.production = environmentProduction;
      // location.protocol = locationProtocol;
      environment.hosts = environmentHosts;
    }).not.toThrowError();
  });

  it('should check calling canActivate', () => {
    expect(() => service.canActivate(routeMock)).not.toThrowError();
  });

  it('should check calling calcCanActivate', () => {
    expect(() => {
      const l = { protocol: 'http:', href: '' } as Location;
      debugService.calcCanActivate(l);
      debugService.calcCanActivate(l, 'http:');
    }).not.toThrowError();
  });
});
