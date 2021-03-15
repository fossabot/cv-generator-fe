import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';

import { Accomplishment } from '../../classes/accomplishment/accomplishment';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

/**
 * Course index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.scss']
})
export class CourseIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** The key. */
  get key() { return Accomplishment.isLanguage(this.propertyName as Accomplishment) ? 'Language' : 'Name'; }

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Update search token delegate. */
  public updateSearchToken(newValue: string) { this.portfolioService.updateSearchToken(newValue); }

  /**
   * Constructs the Course index component.
   * @param portfolioService The portfolio service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    @Inject(SorterService.tokenDescription(SorterKind.Accomplishments)) public readonly sorterService: SorterService,
    @Inject(TruncatorService.tokenDescription(TruncatorKind.Cv)) public readonly truncatorService: TruncatorService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly dataService: DataService,
    public readonly excelDateFormatterService: ExcelDateFormatterService,
    public readonly params?: Params) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService, params);
    if (this.params !== undefined) {
      this.i = this.params.i;
    }
  }

  /** Search token getter delegate. */
  get SearchToken(): string {
    return this.portfolioService.SearchToken;
  }
  /** Search token setter delegate. */
  @Input() set SearchToken(value: string) {
    this.portfolioService.SearchToken = value;
  }

  /** Match frequency for the template to the precalculated cache. */
  get frequency() {
    let frequency;

    const accomplishment = this.propertyName as Accomplishment;
    try {
      const frequenciesCacheKey =
        Accomplishment.isLanguage(accomplishment) ? 'Language'
          : Accomplishment.isCertification(accomplishment) ? 'Certification'
            : Accomplishment.isOrganization(accomplishment) ? 'Organization'
              : Accomplishment.isVolunteering(accomplishment) ? 'Volunteering'
                : Accomplishment.isVacation(accomplishment) ? 'Vacation'
                  : this.key;
      frequency = this.getFrequenciesCache(frequenciesCacheKey).find(_ => _[0] === this.propertyName[this.key]);
    } catch (ex) {
      frequency = this.portfolioService.getEmptyFrequency(this.propertyName[this.key]);
    }

    return frequency;
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    return this.uiService.getFrequencyStyle(frequency, this.truncatorService.TagCloudEmphasis);
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    if (this.portfolioService.checkToggleCollapsed(propertyName)) { return []; }

    return this.portfolioService.getFrequenciesCache(propertyName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}
