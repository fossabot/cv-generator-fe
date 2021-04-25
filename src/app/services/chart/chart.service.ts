import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { Indexable } from '../../interfaces/indexable';
import { ChartColorService } from '../../services/chart-color/chart-color.service';
import { ChartModel } from '../../model/chart/chart.model';

/**
 * A chart diagram service.
 */
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  /** Instances tracker. */
  private chartInstancesCache: Indexable<Chart> = {};

  /** A map of charts by chart type that are already loaded. */
  /** Charts map getter. */
  public get chartLoaded() { return this.chartModel.chartLoaded; }
  /** Charts map setter. */
  public set chartLoaded(value) { this.chartModel.chartLoaded = value; }

  /**
   * Constructs a chart.
   * ~constructor
   *
   * @param chartColorService The chart color service injected dependency.
   * @param chartModel The chart model injected dependency.
   */
  constructor(
    protected readonly chartColorService: ChartColorService,
    protected readonly chartModel: ChartModel,
  ) {
  }

  /** Initializes the color scheme delegate. */
  public initColors() { this.chartColorService.initColors(); }

  /** Draws a chart.
   *
   * @param chartType The type of the chart.
   * @param chartConfiguration The chart configuration.
   */
  public drawChart(chartType: string, chartConfiguration: any) {
    // console.log('Debug: drawChart: chartType:', chartType);
    if (!this.chartLoaded[chartType]) {
      const ctx = this.loadChartContext(this.chartName(chartType));
      // console.log('Debug: drawChart: ctx:', ctx);
      if (ctx != null && ctx !== undefined) {
        // console.log('Debug: drawChart: chartConfiguration:', chartConfiguration);
        this.createChart(ctx, chartConfiguration);
        this.chartLoaded[chartType] = true;
      }
    }
  }

  /**
   * Finds a chart graphics context for a specified id.
   *
   * @param canvasId The chart id to look up context for.
   *
   * @returns The chart graphics context if found.
   */
  // eslint-disable-next-line complexity
  private loadChartContext(canvasId: string): CanvasRenderingContext2D | undefined {
    if (typeof document === 'undefined' || document == null) { return undefined; }

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    // console.log('Debug: loadChartContext: canvas: ', canvas);
    if (typeof canvas === 'undefined' || canvas == null) { return undefined; }

    const ctx = canvas.getContext('2d');
    // console.log('Debug: loadChartContext: ctx: ', ctx);
    if (typeof ctx === 'undefined' || ctx == null) { return undefined; }

    return ctx;
  }

  /**
   * Names a chart element.
   *
   * @param key The type of chart.
   *
   * @returns The chart element name.
   */
  public chartName(key: string): string {
    return key + ' chart';
  }

  /** Invokes redrawing the charts. */
  public refreshCharts() {
    this.chartLoaded = {};
  }

  /**
   * Creates a chart.
   *
   * @param ctx The context to draw the chart in.
   * @param chartConfiguration The chart configuration.
   *
   * @returns A Chart object.
   */
  private createChart(ctx: CanvasRenderingContext2D, chartConfiguration: ChartConfiguration): Chart {
    if (this.chartInstancesCache[ctx.canvas.id] != null) {
      // console.log('Debug: ChartService: createChart: deleting: ctx.canvas.id: ', ctx.canvas.id);
      this.chartInstancesCache[ctx.canvas.id].destroy();
      delete this.chartInstancesCache[ctx.canvas.id];
    }

    // console.log('Debug: ChartService: createChart: instantiating: chartConfiguration: ', chartConfiguration);
    const chart = new Chart(ctx, chartConfiguration);
    this.chartInstancesCache[ctx.canvas.id] = chart;
    return chart;
  }

  /**
   * Adds a chart of frequency objects.
   *
   * @param frequencies Array of frequency data items for the chart.
   * @param _items The background items shown. Used in class descendants.
   *
   * @returns A ChartConfiguration object.
   */
  // tslint:disable-next-line: variable-name
  public addChart(frequencies: any[], _items?: any): ChartConfiguration {
    if (!frequencies) { return {}; }

    const chartConfiguration = this.chartConfiguration;
    if (chartConfiguration.options?.tooltips) { chartConfiguration.options.tooltips = this.tooltips(frequencies); }

    chartConfiguration.data = this.datasetsSettings(frequencies);
    chartConfiguration.data.datasets?.forEach((ds) => ds.data = frequencies.map((_: any) => _[1].Count));
    chartConfiguration.data.labels = frequencies.map((_: any) => _[1].ShortLabel);

    return chartConfiguration;
  }

  /**
   * Adds a language chart.
   *
   * @param languages The array of languages to show.
   *
   * @returns A ChartConfiguration object.
   */
  public addLanguageChart(languages: any[]): ChartConfiguration {
    if (!languages) { return {}; }

    const chartConfiguration = this.chartConfiguration;
    if (chartConfiguration.options?.legend) { chartConfiguration.options.legend.position = 'right'; }
    if (chartConfiguration.options?.tooltips?.callbacks) {
      chartConfiguration.options.tooltips.callbacks = {
        label: (tooltipItem, actualData) => {
          if (tooltipItem.index === undefined) { return ''; }
          return (actualData.labels?.[tooltipItem.index].toString() || '');
        },
        // tslint:disable-next-line: variable-name
        labelTextColor: (_tooltipItem, _chart) => '#000000'
      };
    }

    chartConfiguration.data = this.datasetsSettings(languages);
    chartConfiguration.data.datasets?.forEach((ds) => ds.data = languages.map((_: any) => _.Share));
    chartConfiguration.data.labels = languages.map((_: any) => _.Language + ': ' + _.Level + ' (' + _.Share + '%)');

    return chartConfiguration;
  }

  /**
   * Adds a chart of frequency objects.
   *
   * @param frequencies Array of frequency data items for the chart.
   * @param _items The background items shown. Used in class descendants.
   *
   * @returns A ChartConfiguration object.
   */
  // tslint:disable-next-line: variable-name
  protected get chartConfiguration(): ChartConfiguration {
    return {
      type: 'pie',
      options: {
        legend: {
          labels: {
            // fontFamily: 'Century Gothic',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontColor: '#101010',
            fontSize: 14
          },
          display: true,
          // position: 'bottom'
          position: 'left'
        },
        responsive: false,
        layout: {
          padding: 10
        }
      }
    };
  }

  /**
   * The tooltips.
   *
   * @returns A tooltips object.
   */
  protected tooltips(frequencies?: any[]): Chart.ChartTooltipOptions {
    return {
      mode: 'nearest',
      position: 'average',
      xPadding: 6,
      yPadding: 6,
      bodyFontSize: 14,
      bodySpacing: 2,
      caretSize: 10,
      displayColors: false,
      backgroundColor: 'rgba(255,255,255,0.7)',
      bodyFontColor: '#fff',
      callbacks: {
        // tslint:disable-next-line: variable-name
        label: (tooltipItem, _actualData) => {
          if (tooltipItem.index === undefined || frequencies === undefined) { return ''; }
          return ((frequencies.map((_: any) => _[1].Label)[tooltipItem.index] as string).split('\n'));
        },
        // tslint:disable-next-line: variable-name
        labelTextColor: (_tooltipItem, _chart) => '#000000'
      }
    };
  }

  /**
   * The background color.
   *
   * @param color The default background color.
   *
   * @returns A background color object.
   */
  protected backgroundColor(color: string = '#00000000') {
    return {
      backgroundColor: color,
      hoverBackgroundColor: color,
    };
  }

  /**
   * The border color.
   *
   * @param color The default border color.
   *
   * @returns A border color object.
   */
  protected borderColor(color: string = '#E8E8E8') {
    return {
      borderColor: color,
      hoverBorderColor: color,
    };
  }

  /**
   * The datasets.
   *
   * @param items The items to process.
   *
   * @returns A datasets object.
   */
  private datasetsSettings(items: any[]) {
    return {
      datasets: [{
        backgroundColor: items.map((_: any) => this.chartColorService.nextBackgroundColor()),
        hoverBackgroundColor: items.map((_: any) => this.chartColorService.nextHoverBackgroundColor()),
        ...this.borderColor(),
        borderWidth: 2
      }]
    };
  }

  /**
   * Resize chart
   *
   * @param id The chart id.
   */
  // tslint:disable-next-line: variable-name
  public resize(_canvas: any) { }
}
