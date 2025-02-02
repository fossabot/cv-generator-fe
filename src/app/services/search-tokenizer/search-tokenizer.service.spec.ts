// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { TestBed } from '@angular/core/testing';

import { SearchTokenizerService } from './search-tokenizer.service';

// eslint-disable-next-line max-lines-per-function
describe('SearchTokenizerService', () => {
  let service: SearchTokenizerService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchTokenizerService]
    });
    service = TestBed.inject(SearchTokenizerService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = debugService.tokenize('');
      readAll = debugService.tokenize('test string');
      readAll = debugService.tokenize('"test string"');
      readAll = debugService.tokenize('\'test string\'');
      readAll = debugService.tokenize('"test   string"');
      debugService.reQuote = null;
      readAll = debugService.tokenize('"test   string"');

      readAll = debugService.trim('', '');
      readAll = debugService.trim('', ']');
      readAll = debugService.trim('', '\\');

      readAll = debugService.stripQuote('');
      readAll = debugService.stripQuote('test');
    }).not.toThrowError();
  });
});
