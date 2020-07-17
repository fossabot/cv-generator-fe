import { Component, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { take } from 'rxjs/operators';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ChartService } from '../../services/chart/chart.service';

/**
 * Spectrum component.
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-spectrum',
  templateUrl: './spectrum.component.html',
  styleUrls: ['./spectrum.component.scss']
})
export class SpectrumComponent implements AfterViewInit {
  /** The chart element. */
  @ViewChild('canvas') canvas?: ElementRef;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** Entity key. */
  @Input() key: any;

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /** Tag cloud display mode delegate. */
  public get tagCloudDisplayMode() { return this.portfolioComponent.tagCloudDisplayMode; }

  /** Tag cloud delegate. */
  get tagCloud() {
    return this.portfolioComponent.tagCloud;
  }

  /** Search token getter delegate. */
  get SearchToken(): string {
    return this.portfolioComponent.SearchToken;
  }
  /** Search token setter delegate. */
  @Input() set SearchToken(value: string) {
    this.portfolioComponent.SearchToken = value;
  }

  /** Update search token delegate. */
  public updateSearchToken(newValue: string) { this.portfolioComponent.updateSearchToken(newValue); }

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event: Event) { this.beforeprint(); }

  /**
   * Constructs a Spectrum component.
   * ~constructor
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param chartService The chart service injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    private chartService: ChartService) {
    portfolioComponent.searchTokenChanged$.pipe(take(1)).subscribe(_ => this.onSearchTokenChanged(_));
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    this.restoreToggle(document, this.key);
    this.drawFrequenciesChart('ngAfterViewInit');
  }

  /** Search token changed event handler. */
  private onSearchTokenChanged(value: string) {
    this.drawFrequenciesChart('onSearchTokenChanged');
  }

  /** The resize event handler */
  private resize() {
    this.chartService.resize(this.canvas);
  }

  /** The beforeprint event handler */
  private beforeprint() {
    this.resize();
  }

  /** Restore toggle delegate. */
  private restoreToggle(document: Document, typeName: string, contentName?: string) {
    this.portfolioComponent.restoreToggle(document, typeName, contentName);
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    if (this.portfolioComponent.checkToggleCollapsed(propertyName)) { return []; }

    return this.portfolioComponent.getFrequenciesCache(propertyName);
  }

  /** Chart height. */
  get chartHeight(): number {
    let height = 350;

    if (!this.simpleChart) {
      const frequencies = this.getFrequenciesCache(this.key);
      if (frequencies) {
        height = 650 + frequencies.length * 6;
      }
    }

    return height;
  }

  /** Chart width. */
  get chartWidth(): number {
    let width = 2300;

    if (!this.simpleChart) {
      const frequencies = this.getFrequenciesCache(this.key);
      if (frequencies) {
        width = this.chartHeight + Math.ceil(frequencies.length / (this.chartHeight / 25)) * 100;
      }
    }

    return width;
  }

  /** Whether a simple chart should be used. */
  get simpleChart(): boolean {
    return this.tagCloud === this.tagCloudDisplayMode.both;
  }

  /**
   * Draws a frequencies chart.
   * @param caller The caller function identification.
   */
  private async drawFrequenciesChart(caller: any) {
    // console.log('Debug: In drawFrequenciesChart:', caller);

    const data = this.portfolioComponent.getFrequenciesCache(this.key);

    this.portfolioComponent.refreshCharts();
    this.portfolioComponent.drawChart(this.key, this.chartService.addChart(data));
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.portfolioComponent.keypress(event);
 }

  /** TrackBy iterator help function. */
  trackByFn(index: any, item: any) {
    return index;
  }
}
