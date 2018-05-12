import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { GanttChartService } from '../gantt-chart/gantt-chart.service';

@Injectable()
export class GeneralTimelineService extends GanttChartService {

  public optionsScalesXAxes0Ticks = { min: 28126, max: 43831 };

  public get data() {
    return {
      datasets: [{
        backgroundColor: '#00000000',
        hoverBackgroundColor: '#00000000',
        borderColor: '#00000000',
        fill: false,
        borderWidth: 0,
        pointRadius: 0,
        data: this.items.map((_: any) => _.From)
      }, {
        backgroundColor: this.items.map((_: any) =>
          this.filteredItems.some(__ => (__.Id === _.Id) && (__.Type === _.Type))
            ? _.Color
            : '#00000020'),
        hoverBackgroundColor: this.items.map((_: any) => _.Color),
        borderColor: '#E8E8E8',
        hoverBorderColor: '#E8E8E8',
        fill: false,
        borderWidth: 1,
        pointRadius: 0,
        data: this.items.map((_: any) => _.To - _.From)
      }],
      labels: this.items.map((_: any) => _.Name)
    };
  }
}
