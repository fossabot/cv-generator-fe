import { Component } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { UiService } from '../../services/ui/ui.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

/**
 * Project list component
 */
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  /** Date format */
  public get dateFormat() { return this.uiService.dateFormatMiddle; }

  /** Main component name delegate. */
  public get componentName() { return this.uiService.componentName; }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }
  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.filtered; }

  /**
   * Constructs the Project component.
   * @param portfolioService The portfolio service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    private uiService: UiService,
    private excelDateFormatterService: ExcelDateFormatterService) {
  }

  /** One person team project indicator delegate. */
  public getProjectIsOnePersonTeam(project: any): boolean {
    return this.portfolioService.getProjectIsOnePersonTeam(project);
  }

  /** Get decrypted project period delegate. */
  public getDecryptedProjectPeriod(project: any): string {
    return this.portfolioService.getDecryptedProjectPeriod(project);
  }

  /** Get JS date value from Excel delegate. */
  public getJsDateValueFromExcel(excelDate: any) {
    return this.excelDateFormatterService.getJsDateValueFromExcel(excelDate);
  }

  /** To title case delegate. */
  public toTitleCase(str: string | undefined) { return StringExService.toTitleCase(str); }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /** Frequency getter. */
  public frequency(i: number) {
    return this.portfolioService.frequenciesCache.Project[i];
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    const tagCloudEmphasis = this.portfolioService.controller(this.entities.List?.key).tagCloudEmphasis;
    return this.uiService.getFrequencyStyle(frequency, tagCloudEmphasis);
  }

  /** Truncated collection. */
  public truncated(collection: any[]): any[] {
    return this.portfolioService.truncated(collection, undefined, this.entities.List?.key);
  }

  /** Remaining collection. */
  public remaining(collection: any[]): any[] {
    return this.portfolioService.remaining(collection, undefined, this.entities.List?.key);
  }
}
