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
import { EventEmitter, Injectable } from '@angular/core';

import { ResponsiveChangedEvent } from '../../interfaces/events/responsive-changed-event';
import { Indexable } from '../../interfaces/indexable';
import { ModelModel } from '../../model/model/model.model';

import { EngineService } from '../../services/engine/engine.service';
import { ChartService } from '../../services/chart/chart.service';
import { PersistenceService } from '../persistence/persistence.service';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

/**
 * A toolbar service.
 */
@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  /** Tag cloud getter. */
  public get tagCloud(): TagCloudDisplayMode {
    return Number.parseInt(this.persistenceService.getItem('tagCloud') ?? '1', 10) || TagCloudDisplayMode.tagCloud;
  }
  /** Tag cloud setter. */
  public set tagCloud(value: TagCloudDisplayMode) {
    this.persistenceService.setItem('tagCloud', value.toString());

    this.chartService.refreshCharts();
    this.engine.searchService.searchTokenChanged$.emit(this.engine.searchService.SearchToken);
  }

  /** Whether tag cloud is tagCloud. */
  public get tagCloudIsTagCloud(): boolean {
    return this.tagCloud === TagCloudDisplayMode.tagCloud;
  }

  /** Edit mode getter. */
  public get editMode() {
    return this.persistenceService.getItem('edit mode') === 'true';
  }

  /** Decorations getter. */
  public get decorations() {
    const value = this.persistenceService.getItem('decorations') === 'true';

    const stylePropertyAppearance3D = '--appearance-3d';
    const stylePropertyHrDisplay = '--hr-display';
    if (value) {
      document.documentElement.style.setProperty(stylePropertyAppearance3D, '1');
      document.documentElement.style.setProperty(stylePropertyHrDisplay, 'none');
    } else {
      document.documentElement.style.setProperty(stylePropertyAppearance3D, '0');
      document.documentElement.style.setProperty(stylePropertyHrDisplay, 'block');
    }

    return value;
  }
  /** Decorations setter. */
  public set decorations(value) {
    this.persistenceService.setItem('decorations', value.toString());
  }

  /** Pagination getter. */
  public get pagination() {
    return this.persistenceService.getItem('pagination') === 'true';
  }
  /** Pagination setter. */
  public set pagination(value) {
    this.persistenceService.setItem('pagination', value.toString());
  }

  /** Columns getter. */
  public get columns(): Indexable<boolean> {
    return JSON.parse(this.persistenceService.getItem('columns') ?? '{}');
  }
  /** Columns setter. */
  public set columns(value: Indexable<boolean>) {
    this.persistenceService.setItem('columns', JSON.stringify(value));
  }

  /** Responsive changed event emitter. */
  public readonly responsiveModelChanged$ = new EventEmitter<ResponsiveChangedEvent>();

  /**
   * Constructs the Toolbar service.
   * ~constructor
   *
   * @param engine The engine service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param model The model injected dependency.
   */
  constructor(
    protected readonly engine: EngineService,
    public readonly chartService: ChartService,
    public readonly persistenceService: PersistenceService,
    public readonly model: ModelModel,
  ) {
  }

  /** Responsive getter. */
  public responsive(entityKey = '') {
    return this.persistenceService.getItem([entityKey, 'responsive'].join(' ')) === 'true';
  }

  /** Columns class. */
  public getColumnsClass(value: string): string {
    return (this.columns[value] ? 'columns2' : 'columns1') + ' clear-both';
  }
}
