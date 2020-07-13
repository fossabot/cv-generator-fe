import { Component } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { StringExService } from '../../services/string-ex/string-ex.service';

/**
 * Project contributions component
 */
@Component({
  selector: 'app-project-contributions',
  templateUrl: './project-contributions.component.html',
  styleUrls: ['./project-contributions.component.scss']
})
export class ProjectContributionsComponent {
  /** Date format */
  protected get dateFormat() { return this.portfolioComponent.dateFormatShort; }

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /** Filtered projects delegate. */
  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }

  /**
   * Constructs the Project component.
   * @param portfolioComponent The common portfolio component injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent) {
  }

  /** Get decrypted project period delegate. */
  private getDecryptedProjectPeriod(project): string {
    return this.portfolioComponent.getDecryptedProjectPeriod(project);
  }

  /** Get JS date value from Excel delegate. */
  private getJsDateValueFromExcel(excelDate: any) {
    return this.portfolioComponent.getJsDateValueFromExcel(excelDate);
  }

  /** To title case delegate. */
  public toTitleCase(str) { return StringExService.toTitleCase(str); }

  /** TrackBy iterator help function. */
  trackByFn(index, item) {
    return index;
  }
}