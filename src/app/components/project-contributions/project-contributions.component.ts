import { Component, Inject } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { EngineService } from '../../services/engine/engine.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';

import { UiService } from '../../services/ui/ui.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { ProjectListComponent } from '../project-list/project-list.component';

/**
 * Project contributions component
 * ~extends {@link ProjectListComponent}
 */
@Component({
  selector: 'app-project-contributions',
  templateUrl: './project-contributions.component.html',
  styleUrls: ['./project-contributions.component.scss']
})
export class ProjectContributionsComponent extends ProjectListComponent {
  /** Date format */
  public get dateFormat() { return this.uiService.localizationService.dateFormatShort; }

  /**
   * Constructs the Project component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    protected readonly engine: EngineService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Projects)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Pp)) public readonly truncatorService: TruncatorService,
    protected readonly uiService: UiService,
    protected readonly excelDateFormatterService: ExcelDateFormatterService,
  ) {
    super(portfolioService, engine, sorterService, truncatorService, uiService, excelDateFormatterService);
  }
}
