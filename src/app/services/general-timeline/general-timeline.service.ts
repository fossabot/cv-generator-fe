import { Injectable } from '@angular/core';
import { GanttChartService } from '../gantt-chart/gantt-chart.service';

import { GeneralTimelineModel } from '../../model/general-timeline/general-timeline.model';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';

/**
 * A general timeline chart diagram service.
 * ~extends {@link GanttChartService}
 */
@Injectable({
  providedIn: 'root'
})
export class GeneralTimelineService extends GanttChartService {
  /** Filtered timeline events getter delegate. */
  public get FilteredTimelineEvents(): GeneralTimelineEntry[] {
    return this.generalTimelineModel.FilteredTimelineEvents;
  }
  /** Filtered timeline events setter delegate. */
  public set FilteredTimelineEvents(value: GeneralTimelineEntry[]) {
    this.generalTimelineModel.FilteredTimelineEvents = value;
  }

  /**
   * Constructs the Portfolio service.
   * ~constructor
   *
   * @param generalTimelineModel The general timeline model injected dependency.
   */
  constructor(
    private generalTimelineModel: GeneralTimelineModel
    ) {
    super();
  }

  /**
   * The X-axis range.
   * ~override
   */
  public optionsScalesXAxes0Ticks = { min: 28126, max: 43831 };

  /**
   * The current context data.
   * ~override
   *
   * @returns A Data object.
   */
  public get data(): Chart.ChartData {
    return {
      datasets: [{
        backgroundColor: '#00000000',
        hoverBackgroundColor: '#00000000',
        borderColor: '#00000000',
        fill: false,
        borderWidth: 0,
        pointRadius: 0,
        data: this.items.map((_: GeneralTimelineEntry) => _.From)
      }, {
        backgroundColor: this.items.map((_: GeneralTimelineEntry) =>
          this.filteredItems.some((__: GeneralTimelineEntry) => (__.Id === _.Id) && (__.Type === _.Type))
            ? _.Color
            : '#00000020'),
        hoverBackgroundColor: this.items.map((_: GeneralTimelineEntry) => _.Color),
        borderColor: '#E8E8E8',
        hoverBorderColor: '#E8E8E8',
        fill: false,
        borderWidth: 1,
        pointRadius: 0,
        data: this.items.map((_: GeneralTimelineEntry) => _.To - _.From)
      }],
      labels: this.items.map((_: GeneralTimelineEntry) => _.Type.substr(0, 2) + _.Id + ': ' + _.Name)
    };
  }
}
