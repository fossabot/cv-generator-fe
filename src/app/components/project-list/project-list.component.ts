import { Component, Inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { UiService } from '../../services/ui/ui.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { SorterService } from '../../services/sorter/sorter.service';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { Project } from '../../interfaces/project/project';

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
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    @Inject(SorterService.tokenDescription(SorterKind.Projects)) public readonly sorterService: SorterService,
    @Inject(TruncatorService.tokenDescription(TruncatorKind.Pp)) public readonly truncatorService: TruncatorService,
    private readonly uiService: UiService,
    private readonly excelDateFormatterService: ExcelDateFormatterService) {
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
  public frequency(project: Project) {
    return this.portfolioService.projectFrequency(project);
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    return this.uiService.getFrequencyStyle(frequency, this.truncatorService.TagCloudEmphasis);
  }
}
