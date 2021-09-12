// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';

import { DocumentService } from './document.service';

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = service.scrollFunction();
      const button = document.createElement('BUTTON') as HTMLButtonElement;
      button.id = 'goToTopBtn';
      document.body.appendChild(button);
      readAll = service.scrollFunction();

      readAll = service.goToTop();
    }).not.toThrowError();
  });
});
