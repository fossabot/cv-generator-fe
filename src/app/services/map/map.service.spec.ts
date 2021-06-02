import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';

// eslint-disable-next-line max-lines-per-function
describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.countriesVisited;
      readAll = service.entity;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      const frequencies = [
        ['Bulgaria', { Count: 15, Percentage: 44, Lightness: 0 }],
        ['Norway', { Count: 10, Percentage: 29, Lightness: 20 }]
      ];
      const countriesVisited = ['Russia', 'Ukraine', 'Romania', 'Hungary'];
      readAll = service.prepareMap(frequencies, countriesVisited);
      readAll = service.prepareMap([], countriesVisited);
    }).not.toThrowError();
  });
});
