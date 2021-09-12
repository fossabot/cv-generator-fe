// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Injectable } from '@angular/core';

import { FilterService } from '../../services/filter/filter.service';

import { ModelModel } from '../../model/model/model.model';

/**
 * A search service.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /** Search query string expression getter. */
  public get SearchToken(): string { return this.model.portfolioModel.searchToken; }
  /** Search query string expression setter. */
  public set SearchToken(value: string) {
    this.model.portfolioModel.searchToken = value;
    this.filterService.searchTokenChangeHandler();
  }

  /** Search query string expression changed event delegate. */
  public readonly searchTokenChanged$ = this.filterService.searchTokenChanged$;

  /**
   * Constructs the Search service.
   * ~constructor
   *
   * @param filterService The filter service injected dependency.
   * @param model The model injected dependency.
   */
  constructor(
    public readonly filterService: FilterService,
    public readonly model: ModelModel,
  ) {
  }

  /**
   * Updates the search with a new search query initiating a new search.
   *
   * @param event The initiating click event.
   */
  public updateSearchToken(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement;
    if (target.title.includes(this.filterService.countCacheService.uiService.uiText('Search for this'))) {
      event.stopPropagation();
      this.SearchToken = target.innerHTML;
    }
  }
}
