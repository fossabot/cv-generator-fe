import { TestBed, inject } from '@angular/core/testing';

import { SearchEngineService } from './search-engine.service';
import { SearchTokenizerService } from '../search-tokenizer/search-tokenizer.service';

describe('SearchEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchEngineService, SearchTokenizerService]
    });
  });

  it('should be created', inject([SearchEngineService], (service: SearchEngineService) => {
    expect(service).toBeTruthy();
  }));
});
